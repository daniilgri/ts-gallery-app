import {
  dbConnection,
  objectStores,
  errors,
  transactionModes
} from "./constants";
import { IPost } from "../interfaces/posts";

export class Database {
  private name: string;
  private version: number;
  private connection: IDBDatabase;
  private key: string;

  constructor(name: string, version: number, key: string) {
    this.name = name;
    this.version = this.version;
    this.key = key;
  }

  connect(objectStores: string[]): Promise<Database> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.name, this.version);
      req.onsuccess = () => {
        this.connection = req.result;

        this.connection.onversionchange = () => {
          this.connection.close();
          reject(errors.OLD_DB_PAGE_REFRESH);
        };

        resolve(this);
      };

      req.onupgradeneeded = () => {
        this.connection = req.result;

        for (let objS of objectStores) {
          if (!this.connection.objectStoreNames.contains(objS)) {
            this.connection.createObjectStore(objS, {
              keyPath: this.key,
              autoIncrement: true
            });
          }
        }

        resolve(this);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  push(objectStore: string, values: IPost) {
    return new Promise<void>((resolve, reject) => {
      const trx = this.connection
        .transaction(
          [objectStore],
          transactionModes.READ_WRITE as IDBTransactionMode
        )
        .objectStore(objectStore);

      const req = trx.add(values);
      req.onsuccess = () => {
        resolve();
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  getAll<T>(objectStore: string) {
    return new Promise<T[]>((resolve, reject) => {
      const trans = this.connection
        .transaction(
          objectStore,
          transactionModes.READ_ONLY as IDBTransactionMode
        )
        .objectStore(objectStore);
      const req = trans.getAll();

      req.onsuccess = () => {
        resolve(req.result);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  }
}

import { ERRORS, TRANSACTION_MODE } from "./constants";
import { IPost } from "../interfaces/posts";
import { OBJECT_STORES, DB_CONNECTION } from "../db/constants";

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
      if (this.connection) {
        resolve(this);
        return;
      }
      const req = indexedDB.open(this.name, this.version);
      req.onsuccess = () => {
        this.connection = req.result;

        this.connection.onversionchange = () => {
          this.connection.close();
          reject(ERRORS.OLD_DB_PAGE_REFRESH);
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
          TRANSACTION_MODE.READ_WRITE as IDBTransactionMode
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
          TRANSACTION_MODE.READ_ONLY as IDBTransactionMode
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

export const db = new Database(
  DB_CONNECTION.NAME,
  DB_CONNECTION.VERSION,
  DB_CONNECTION.KEY
).connect([OBJECT_STORES.POSTS]);

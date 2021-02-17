import { dbConnection, objectStores, errors } from "../constants";
import { IPost } from "../interfaces/posts";

export default class Database {
  name: string;
  version: number;
  connection: IDBDatabase;
  key: string;

  constructor(name: string, version: number, key: string) {
    this.name = name;
    this.version = this.version;
    this.key = key;
  }

  connect(objectStores: string[]) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.name, this.version);
      req.onsuccess = () => {
        this.connection = req.result;

        this.connection.onversionchange = () => {
          this.connection.close();
          console.log(errors.OLD_DB_PAGE_REFRESH);
        };

        resolve(this.connection);
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

        resolve(this.connection);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  push(objectStore: string, values: IPost) {
    return new Promise((resolve, reject) => {
      const trx = this.connection
        .transaction([objectStore], "readwrite")
        .objectStore(objectStore);

      const req = trx.add(values);
      req.onsuccess = () => {
        resolve(`[appendDB] -> ${objectStore}, Task finished`);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  getAll(objectStore: string) {
    return new Promise((resolve, reject) => {
      const trans = this.connection
        .transaction(objectStore, dbConnection.READ_ONLY)
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

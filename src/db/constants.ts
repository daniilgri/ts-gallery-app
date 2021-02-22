export enum DB_CONNECTION {
  NAME = "gallery",
  VERSION = 2,
  KEY = "id"
}

export enum OBJECT_STORES {
  POSTS = "posts"
}

export enum ERRORS {
  OLD_DB_PAGE_REFRESH = "There is a newer verison of database. Pls refresh the page"
}

export enum TRANSACTION_MODE {
  READ_ONLY = "readonly",
  READ_WRITE = "readwrite"
}

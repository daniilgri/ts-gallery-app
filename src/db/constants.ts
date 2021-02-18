export enum dbConnection {
  DB_NAME = "gallery",
  DB_VERSION = 2,
  DB_KEY = "id"
}

export enum objectStores {
  POSTS = "posts"
}

export enum errors {
  OLD_DB_PAGE_REFRESH = "There is a newer verison of database. Pls refresh the page"
}

export enum transactionModes {
  READ_ONLY = "readonly",
  READ_WRITE = "readwrite"
}

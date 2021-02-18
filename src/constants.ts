export const dbConnection = {
  DB_NAME: "gallery",
  DB_VERSION: 2,
  DB_KEY: "id",
  READ_ONLY: "readonly" as IDBTransactionMode,
  READ_WRITE: "readwrite" as IDBTransactionMode
};

export const objectStores = {
  POSTS: "posts"
};

export const errors = {
  OLD_DB_PAGE_REFRESH:
    "There is a newer verison of database. Pls refresh the page"
};

export const routes = {
  gallery: "gallery",
  form: "form"
};

import Router from "../router/router";
import { Database } from "./index";

export const withDatabase = (db: Promise<Database>, router: Router): void => {
  router.routes.forEach(route => {
    route.component.db = db;
  });
};

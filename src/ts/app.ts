import "../styles/main.scss";
import Router from "../router/router";
import Route from "../router/route";
import { routeNames } from "../router/constants";
import { FormContainer } from "../views/Form/container";
import { GalleryContainer } from "../views/Gallery/container";
import { objectStores, dbConnection } from "../db/constants";
import { Database } from "../db/index";

export const db = new Database(
  dbConnection.DB_NAME,
  dbConnection.DB_VERSION,
  dbConnection.DB_KEY
).connect([objectStores.POSTS]);

window.addEventListener("load", () => {
  new Router(
    [
      new Route(routeNames.gallery, GalleryContainer, true),
      new Route(routeNames.form, FormContainer)
    ],
    document.getElementById("app") as HTMLElement
  );
});

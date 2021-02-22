import "../styles/main.scss";
import Router from "../router/router";
import Route from "../router/route";
import { ROUTE_NAMES } from "../router/constants";
import { FormContainer } from "../views/Form/container";
import { GalleryContainer } from "../views/Gallery/container";
import { OBJECT_STORES, DB_CONNECTION } from "../db/constants";
import { Database } from "../db/index";

export const db = new Database(
  DB_CONNECTION.NAME,
  DB_CONNECTION.VERSION,
  DB_CONNECTION.KEY
).connect([OBJECT_STORES.POSTS]);

window.addEventListener("load", () => {
  new Router(
    [
      new Route(ROUTE_NAMES.GALLERY, GalleryContainer, true),
      new Route(ROUTE_NAMES.FORM, FormContainer)
    ],
    document.getElementById("app") as HTMLElement
  );
});

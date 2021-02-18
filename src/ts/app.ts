import "../styles/main.scss";
import Router from "./router";
import Route from "./route";

import Form from "../views/form";
import Gallery from "../views/gallery";

import { routes } from "../constants";

window.addEventListener("load", () => {
  new Router(
    [new Route(routes.gallery, Gallery, true), new Route(routes.form, Form)],
    document.getElementById("app") as HTMLElement
  );
});

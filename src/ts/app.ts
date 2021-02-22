import "./app.scss";
import Router from "../router/router";
import Route from "../router/route";
import { ROUTE_NAMES } from "../router/constants";
import { FormContainer } from "../views/Form/container";
import { GalleryContainer } from "../views/Gallery/container";

window.addEventListener("load", () => {
  new Router(
    [
      new Route(ROUTE_NAMES.GALLERY, GalleryContainer, true),
      new Route(ROUTE_NAMES.FORM, FormContainer)
    ],
    document.getElementById("app") as HTMLElement
  );
});

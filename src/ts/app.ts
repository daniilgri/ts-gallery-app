import "../styles/main.scss";
import Router from "./router";
import Route from "./route";

(function () {
  function init() {
    const router = new Router([
      new Route("gallery", "gallery.html", true),
      new Route("form", "form.html")
    ]);
  }
  init();
})();

import Route from "./route";

export default class Router {
  routes: Route[];
  rootElem: HTMLElement;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.rootElem = document.getElementById("app");
    this.init();
  }

  init() {
    const r = this.routes;
    (function (scope, r) {
      window.addEventListener("hashchange", function () {
        scope.hashChange(scope, r);
      });
    })(this, r);

    this.hashChange(this, r);
  }

  hashChange(scope: Router, r: Route[]) {
    if (window.location.hash.length > 0) {
      for (let route of r) {
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let route of r) {
        if (route.default) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  }

  goToRoute(htmlName: string) {
    (function (scope: Router) {
      const url = htmlName;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    })(this);
  }
}

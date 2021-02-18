import Route from "./route";

export default class Router {
  routes: Route[];
  rootElem: HTMLElement;

  constructor(routes: Route[], rootElem: HTMLElement) {
    this.routes = routes;
    this.rootElem = rootElem;

    window.addEventListener("hashchange", () => {
      this.hashChange();
    });

    this.hashChange();
  }

  hashChange() {
    if (window.location.hash.length > 0) {
      this.routes.forEach(route => {
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          this.goToRoute(route);
        }
      });
    } else {
      this.routes.forEach(route => {
        if (route.default) {
          this.goToRoute(route);
        }
      });
    }
  }

  async goToRoute(route: Route) {
    this.rootElem.innerHTML = route.component.render();
    await route.component.afterRender();
  }
}

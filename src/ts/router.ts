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
      for (let route of this.routes) {
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          this.goToRoute(route);
        }
      }
    } else {
      for (let route of this.routes) {
        if (route.default) {
          this.goToRoute(route);
        }
      }
    }
  }

  async goToRoute(route: Route) {
    this.rootElem.innerHTML = await route.component.render();
    await route.component.afterRender();
  }
}

export default class Route {
  name: string;
  htmlName: string;
  default: boolean;

  constructor(name: string, htmlName: string, defaultRoute: boolean = false) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  }

  isActiveRoute(hashedPath: string) {
    return hashedPath.replace("#", "") === this.name;
  }
}

import { IBaseComponent } from "../interfaces/components";

export default class Route {
  name: string;
  component: IBaseComponent;
  default: boolean;

  constructor(
    name: string,
    component: IBaseComponent,
    defaultRoute: boolean = false
  ) {
    this.name = name;
    this.component = component;
    this.default = defaultRoute;
  }

  isActiveRoute(hashedPath: string) {
    return hashedPath === this.name;
  }
}

import { IBaseComponent, IBaseContainer } from "../interfaces/components";

export default class Route {
  name: string;
  component: IBaseContainer;
  default: boolean;

  constructor(
    name: string,
    component: IBaseContainer,
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

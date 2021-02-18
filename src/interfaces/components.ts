import { Database } from "../db/index";

export interface IBaseComponent {
  render: () => string;
  afterRender: () => Promise<void> | void;
}

export interface IBaseContainer extends IBaseComponent {
  db?: Promise<Database>;
  props?: unknown;
}

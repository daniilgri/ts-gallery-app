import { Database } from "../db/index";

export interface IBaseComponent {
  render: () => string;
  afterRender: () => Promise<void> | void;
}

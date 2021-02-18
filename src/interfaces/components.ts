export interface IBaseComponent {
  render: () => Promise<string>;
  afterRender: () => Promise<void>;
}

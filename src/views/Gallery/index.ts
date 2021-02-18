import { IPost } from "../../interfaces/posts";
import { renderListOfPosts } from "./controllers";

export default {
  render: async () => {
    return `
      <div class="wrapper">
        <div class="gallery" id="gallery"></div>
      </div>
    `;
  },
  afterRender: async () => {
    renderListOfPosts();
  }
};

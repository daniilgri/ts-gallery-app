import { objectStores } from "../constants";
import { db } from "../db/index";
import { IPost } from "../interfaces/posts";

export default {
  render: async () => {
    return `
      <div class="wrapper">
        <div class="gallery" id="gallery"></div>
      </div>
    `;
  },
  afterRender: async () => {
    const data = await (await db).getAll<IPost>(objectStores.POSTS);

    const galleryList = document.getElementById("gallery") as HTMLElement;

    for (let el of data) {
      const post = document.createElement("div");
      const postAuthor = document.createElement("p");
      const postImage = document.createElement("img");
      const postDescription = document.createElement("p");

      post.classList.add("post");
      postAuthor.classList.add("post__author");
      postAuthor.innerText = el.author;
      postImage.classList.add("post__img");
      postImage.src = el.link;
      postDescription.classList.add("post__description");
      postDescription.innerText = el.description;

      post.appendChild(postAuthor);
      post.appendChild(postImage);
      post.appendChild(postDescription);

      galleryList.appendChild(post);
    }
  }
};

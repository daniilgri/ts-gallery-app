import { IPost } from "../../interfaces/posts";
import { IBaseComponent } from "../../interfaces/components";

export const Gallery: IBaseComponent = {
  render: () => {
    return `
      <div class="wrapper">
        <div class="gallery" id="gallery"></div>
      </div>
    `;
  },
  async afterRender() {
    const galleryList = document.getElementById("gallery") as HTMLElement;

    (await this.props.getPosts()).forEach((el: IPost) => {
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
    });
  }
};

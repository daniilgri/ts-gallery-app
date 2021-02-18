import { objectStores } from "./../constants";
import { db } from "../db/index";

export default {
  render: async (): Promise<string> => {
    return `<div class="wrapper">
    <form id="newPostForm" class="form-content">
      <input type="text" placeholder="Author" name="author" class="form-input" />
      <input
        type="text"
        placeholder="Image link"
        name="imageLink"
        class="form-input"
      />
      <img alt="image preview" name="imgPreview" />
      <button type="button" name="loadPreview" class="btn--outlined">Load</button>
      <textarea
        type="text"
        placeholder="Description"
        name="description"
        class="form-input"
      ></textarea>
      <button type="submit" class="btn--filled">Publish</button>
    </form>
  </div>
  `;
  },
  afterRender: async (): Promise<void> => {
    const authorInput = document.querySelector(
      "#newPostForm input[name='author']"
    ) as HTMLInputElement;
    const linkInput = document.querySelector(
      "#newPostForm input[name='imageLink']"
    ) as HTMLInputElement;
    const descriptionInput = document.querySelector(
      "#newPostForm textarea[name='description']"
    ) as HTMLInputElement;
    const loadPreviewButton = document.querySelector(
      "#newPostForm button[name='loadPreview']"
    ) as HTMLElement;
    const imgPreview = document.querySelector(
      "#newPostForm img[name='imgPreview'"
    ) as HTMLImageElement;
    const newPostForm = document.getElementById("newPostForm") as HTMLElement;

    loadPreviewButton.addEventListener("click", event => {
      event.preventDefault();
      if (linkInput.value !== "") {
        imgPreview.style.display = "inline-block";
        imgPreview.src = linkInput.value;
      }
    });

    newPostForm.addEventListener("submit", async event => {
      event.preventDefault();
      (await db).push(objectStores.POSTS, {
        author: authorInput.value,
        link: linkInput.value,
        description: descriptionInput.value
      });
    });
  }
};

import { IBaseComponent } from "../../interfaces/components";

export const Form: IBaseComponent = {
  render: (): string => {
    return `
    <form id="newPostForm" class="form">
      <input type="text" placeholder="Author" name="author" class="input" />
      <input
        type="text"
        placeholder="Image link"
        name="imageLink"
        class="input"
      />
      <img alt="image preview" name="imgPreview" class="preview-img"/>
      <button type="button" name="loadPreview" class="button button_outlined">Load</button>
      <textarea
        type="text"
        placeholder="Description"
        name="description"
        class="input"
      ></textarea>
      <button type="submit" class="button button_filled">Publish</button>
    </form>
  `;
  },
  afterRender(): void {
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

    newPostForm.addEventListener("submit", event => {
      event.preventDefault();
      this.props.addNewPost({
        author: authorInput.value,
        link: linkInput.value,
        description: descriptionInput.value
      });
      authorInput.value = "";
      linkInput.value = "";
      descriptionInput.value = "";
    });
  }
};

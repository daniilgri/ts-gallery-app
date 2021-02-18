import { handleFormSubmit } from "./controllers";

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
    handleFormSubmit();
  }
};

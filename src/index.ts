import "./styles/main.scss";

interface IPost {
  author: string;
  link: string;
  description: string;
}

let openRequest = indexedDB.open("gallery", 2);

openRequest.onupgradeneeded = () => {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });
  }
};
openRequest.onerror = () => {
  console.error("Error", openRequest.error);
};
openRequest.onsuccess = () => {
  let db = openRequest.result;
  console.log("initial");
  db.onversionchange = () => {
    db.close();
    alert("База данных устарела, пожалуста, перезагрузите страницу.");
  };

  const authorInput = document.querySelector(
    "#newPostForm input[name='author']"
  ) as HTMLInputElement;
  const linkInput = document.querySelector(
    "#newPostForm input[name='imageLink']"
  ) as HTMLInputElement;
  const descriptionInput = document.querySelector(
    "#newPostForm input[name='description']"
  ) as HTMLInputElement;
  const loadPreviewButton = document.querySelector(
    "#newPostForm button[name='loadPreview']"
  ) as HTMLElement;
  const imgPreview = document.querySelector(
    "#newPostForm img[name='imgPreview'"
  ) as HTMLImageElement;

  if (loadPreviewButton) {
    loadPreviewButton.addEventListener("click", async event => {
      event.preventDefault();
      if (linkInput && linkInput.value !== "") {
        imgPreview.src = linkInput.value;
      }
    });
  }

  const newPostForm: HTMLElement | null = document.getElementById(
    "newPostForm"
  );
  if (newPostForm) {
    newPostForm.addEventListener("submit", event => {
      event.preventDefault();

      if (authorInput && linkInput && descriptionInput) {
        addPost(db, {
          author: authorInput.value,
          link: linkInput.value,
          description: descriptionInput.value
        });
      }
    });
  }

  const trans = db.transaction("posts", "readonly");
  const store = trans.objectStore("posts");
  const data = store.getAll();

  data.onsuccess = () => {
    const galleryList = document.getElementById("gallery") as HTMLElement;

    if (galleryList) {
      for (let el of data.result) {
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
};

openRequest.onblocked = () => {};

export const addPost = (db: IDBDatabase, values: IPost) => {
  let transaction = db.transaction("posts", "readwrite");

  const request = transaction.objectStore("posts").add(values);

  request.onerror = () => {
    console.log(request.error);
  };
};

import { Gallery } from "./index";
import { objectStores } from "../../db/constants";
import { IPost } from "../../interfaces/posts";
import { db } from "../../ts/app";

export const GalleryContainer = {
  ...Gallery,
  props: {
    getPosts: async (): Promise<IPost[]> => {
      return await (await db).getAll<IPost>(objectStores.POSTS);
    }
  }
};
// how to inject db inside container

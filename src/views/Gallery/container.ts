import { Gallery } from "./index";
import { OBJECT_STORES } from "../../db/constants";
import { IPost } from "../../interfaces/posts";
import { db } from "../../db/index";

export const GalleryContainer = {
  ...Gallery,
  props: {
    getPosts: async (): Promise<IPost[]> => {
      return await (await db).getAll<IPost>(OBJECT_STORES.POSTS);
    }
  }
};

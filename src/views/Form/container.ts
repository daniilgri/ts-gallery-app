import { Form } from "./index";
import { OBJECT_STORES } from "../../db/constants";
import { IPost } from "../../interfaces/posts";
import { db } from "../../db/index";

export const FormContainer = {
  ...Form,
  props: {
    addNewPost: async (values: IPost) => {
      (await db).push(OBJECT_STORES.POSTS, values);
    }
  }
};

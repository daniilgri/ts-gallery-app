import { Form } from "./index";
import { objectStores } from "../../db/constants";
import { IPost } from "../../interfaces/posts";
import { db } from "../../ts/app";

export const FormContainer = {
  ...Form,
  props: {
    addNewPost: async (values: IPost) => {
      (await db).push(objectStores.POSTS, values);
    }
  }
};

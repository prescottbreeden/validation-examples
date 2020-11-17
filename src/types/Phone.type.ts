import { randomString } from "utilities";

export type Phone = {
  id: string;
  description: string;
  number: string;
};

export const emptyPhone = (): Phone => ({
  id: randomString(),
  description: "",
  number: "",
});

import { atom } from "recoil";

export const inputBoxAtom = atom({
  key: "inputboxAtom",
  default: {
    firstname: "",
    lastname: "",
    password: "",
  },
});

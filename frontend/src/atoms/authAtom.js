import { atom } from "recoil";

export const authenticationAtom = atom({
  key: "authenticationAtom",
  default: localStorage.getItem("token") || null,
});

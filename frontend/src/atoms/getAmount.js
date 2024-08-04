import { atom, selector } from "recoil";
import { authenticationAtom } from "./authAtom";

export const getAmountAtom = atom({
  key: "getAmountAtom",
  default: selector({
    key: "getAmountAtomSelector",
    get: async ({ get }) => {
      const token = get(authenticationAtom);
      const originalToken = token.split('"')[1];

      const response = await fetch(
        "http://localhost:3000/account/get/balance",
        {
          method: "POST",
          headers: {
            authorization: `${originalToken}`,
          },
        }
      );
      const amount = await response.json();
      return amount;
    },
  }),
});

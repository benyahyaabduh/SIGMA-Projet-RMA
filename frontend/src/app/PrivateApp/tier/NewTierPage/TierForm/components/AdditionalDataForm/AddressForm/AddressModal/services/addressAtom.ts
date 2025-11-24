import { atom, selector } from "recoil";

import { isDefined } from "utils/helper";
import { OpenModalProps } from "types";

export const addressModalAtom = atom({
  key: "addressModalAtom",
  default: null as OpenModalProps | null,
});

export const addressData = selector({
  key: "addressData",
  get: ({ get }) => ({
    isOpen: isDefined(get(addressModalAtom)),
    params: get(addressModalAtom),
  }),
});

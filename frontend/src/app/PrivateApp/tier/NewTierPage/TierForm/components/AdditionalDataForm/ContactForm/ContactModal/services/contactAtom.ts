import { atom, selector } from "recoil";

import { isDefined } from "utils/helper";
import { OpenModalProps } from "types";

export const contactModalAtom = atom({
  key: "contactModalAtom",
  default: null as OpenModalProps | null,
});

export const contactData = selector({
  key: "contactData",
  get: ({ get }) => ({
    isOpen: isDefined(get(contactModalAtom)),
    params: get(contactModalAtom),
  }),
});

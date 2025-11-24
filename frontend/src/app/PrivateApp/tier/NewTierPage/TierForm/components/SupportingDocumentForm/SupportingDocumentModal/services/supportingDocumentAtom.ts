import { atom, selector } from "recoil";

import { isDefined } from "utils/helper";
import { OpenModalProps } from "types";

export const supportingDocumentModalAtom = atom({
  key: "supportingDocumentModalAtom",
  default: null as OpenModalProps | null,
});

export const supportingDocumentData = selector({
  key: "supportingDocumentData",
  get: ({ get }) => ({
    isOpen: isDefined(get(supportingDocumentModalAtom)),
    params: get(supportingDocumentModalAtom),
  }),
});

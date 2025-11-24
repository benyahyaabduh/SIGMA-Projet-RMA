import { atom, selector } from "recoil";

import { isDefined } from "utils/helper";
import { OpenModalProps } from "types";

export const annotationModalAtom = atom({
  key: "annotationModalAtom",
  default: null as OpenModalProps | null,
});

export const annotationData = selector({
  key: "annotationData",
  get: ({ get }) => ({
    isOpen: isDefined(get(annotationModalAtom)),
    params: get(annotationModalAtom),
  }),
});

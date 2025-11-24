import { atom, selector } from "recoil";

import { isDefined } from "utils/helper";
import { OpenModalProps } from "types";

export const policyModalAtom = atom({
  key: "policyModalAtom",
  default: null as OpenModalProps | null,
});

export const policyData = selector({
  key: "policyData",
  get: ({ get }) => ({
    isOpen: isDefined(get(policyModalAtom)),
    params: get(policyModalAtom),
  }),
});

import { atom, selector } from "recoil";
import { isDefined } from "utils/helper";

export interface DeleteModalProps {
  state?: string;
}

export const deleteModalAtom = atom({
  key: "deleteModalAtom",
  default: null as DeleteModalProps | null,
});

export const deleteData = selector({
  key: "deleteData",
  get: ({ get }) => ({
    isOpen: isDefined(get(deleteModalAtom)),
    data: get(deleteModalAtom),
  }),
});

import { useSetRecoilState } from "recoil";
import { supportingDocumentModalAtom } from "./supportingDocumentAtom";
import { OpenModalProps } from "types";

const useSupportingDocument = () => {
  const setModal = useSetRecoilState(supportingDocumentModalAtom);

  const onOpenModal = (props: OpenModalProps) => {
    setModal(props);
  };

  const onCloseModal = () => {
    setModal(null);
  };

  return { onOpenModal, onCloseModal };
};

export default useSupportingDocument;

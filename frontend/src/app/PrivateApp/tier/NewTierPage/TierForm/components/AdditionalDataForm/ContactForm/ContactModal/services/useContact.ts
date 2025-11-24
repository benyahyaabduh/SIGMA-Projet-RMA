import { useSetRecoilState } from "recoil";
import { contactModalAtom } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm/ContactModal/services/contactAtom";
import { OpenModalProps } from "types";

const useContact = () => {
  const setModal = useSetRecoilState(contactModalAtom);

  const onOpenModal = (props: OpenModalProps) => {
    setModal(props);
  };

  const onCloseModal = () => {
    setModal(null);
  };

  return { onOpenModal, onCloseModal };
};

export default useContact;

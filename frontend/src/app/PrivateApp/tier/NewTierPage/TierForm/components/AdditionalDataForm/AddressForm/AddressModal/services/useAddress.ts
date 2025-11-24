import { useSetRecoilState } from "recoil";
import { addressModalAtom } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm/AddressModal/services/addressAtom";
import { OpenModalProps } from "types";

const useAddress = () => {
  const setModal = useSetRecoilState(addressModalAtom);

  const onOpenModal = (props: OpenModalProps) => {
    setModal(props);
  };

  const onCloseModal = () => {
    setModal(null);
  };

  return { onOpenModal, onCloseModal };
};

export default useAddress;

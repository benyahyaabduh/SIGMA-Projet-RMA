import { useSetRecoilState } from "recoil";
import { policyModalAtom } from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm/PolicyModal/services/policyAtom";
import { OpenModalProps } from "types";

const useAddress = () => {
  const setModal = useSetRecoilState(policyModalAtom);

  const onOpenModal = (props: OpenModalProps) => {
    setModal(props);
  };

  const onCloseModal = () => {
    setModal(null);
  };

  return { onOpenModal, onCloseModal };
};

export default useAddress;

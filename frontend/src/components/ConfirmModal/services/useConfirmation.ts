import { useSetRecoilState } from 'recoil';

import { ConfirmationProps } from './ConfirmationType';
import { confirmationModalAtom } from './confirmationAtom';

const useConfirmation = () => {
    const setModal = useSetRecoilState(confirmationModalAtom);

    const onOpenModal = (props: ConfirmationProps) => {
        setModal(props);
    };

    const onCloseModal = () => {
        setModal(null);
    };

    return { onOpenModal, onCloseModal };
};

export default useConfirmation;

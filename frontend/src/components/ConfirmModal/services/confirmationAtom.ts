import { isNull } from 'lodash';
import { atom, selector } from 'recoil';

import { ConfirmationProps } from './ConfirmationType';

export const confirmationModalAtom = atom({
    key: 'confirmationModalAtom',
    default: null as ConfirmationProps | null
});

export const confirmationData = selector({
    key: 'confirmationData',
    get: ({ get }) => ({
        isOpen: !isNull(get(confirmationModalAtom)),
        ...get(confirmationModalAtom)
    })
});

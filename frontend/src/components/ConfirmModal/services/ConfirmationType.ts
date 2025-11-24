export interface ConfirmationProps {
    title?: string | object;
    message?: string | object;
    onConfirm: (data?: any) => Promise<any>;
    onConfirmProps?: any;
    onCancel?: () => void;
}

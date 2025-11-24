export interface Option {
    id: number;
    version: number;
    value: number | string;
    code?: number | string;
    label: string;
    name?: string;
    isDefault?: boolean;
}

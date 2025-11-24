import { ComponentType, FC } from "react";

export type StepProps = {
  code: string;
  label: string | object;
  subTitle?: string;
  color?: string;
  icon?: ComponentType;
  onClick?: (value: any) => void;
  // isActive: boolean;
  disabled?: boolean;
  isValidated?: boolean;
  component: FC<any>;
};

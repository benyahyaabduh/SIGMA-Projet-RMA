import { ComponentType } from "react";

export interface DatableActionProps {
  // id?: number;
  label: any;
  icon: ComponentType;
  onClick: (value: any) => void;
}

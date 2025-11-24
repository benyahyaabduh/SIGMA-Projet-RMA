import { FC } from "react";

export interface TabProps {
  value: string;
  label: any;
  component: FC<any>;
  componentProps?: any;
}

export interface TabContextProps {
  tabs: TabProps[];
  initialTab?: string;
  margin?: number;
  padding?: number;
  onChange?: (data: any) => void;
  actions?: any;
}

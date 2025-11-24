import { Option } from "./Option";

export default interface FormFieldProps {
  name?: string;
  layerName?: string;
  label?: string | object;
  required?: boolean;
  xs?: number;
  disabled?: boolean;
  isFiltered?: boolean;
  inclusions?: string[];
  options?: Option[];
  apiProps?: any;
  [x: string]: any;
}

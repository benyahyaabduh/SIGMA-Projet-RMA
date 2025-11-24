import React from "react";
import { FormState } from "react-hook-form/dist/types/form";

export default interface FormSubmitProps {
  data: any;
  options?: any;
  event?: React.BaseSyntheticEvent;
  formState?: FormState<any>;
}

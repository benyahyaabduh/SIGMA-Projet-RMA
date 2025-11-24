import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { CancelButton } from "components/index";

interface FormResetButtonProps {
  label: any;
  onClick?: () => void;
  defaultValues: any;
}

const FormResetButton: FC<FormResetButtonProps> = ({
  label,
  onClick,
  defaultValues,
}) => {
  const { reset } = useFormContext();

  const onResetHandler = () => {
    reset(defaultValues);
    if (onClick) {
      onClick();
    }
  };

  return <CancelButton label={label} onClick={onResetHandler} />;
};

export default FormResetButton;

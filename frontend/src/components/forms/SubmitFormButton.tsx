import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import messages from "config/i18n/messages";
import SubmitButton from "components/Button/SubmitButton";

interface SubmitButtonProps {
  label?: any;
  onClick?: () => void;

  [x: string]: any;
}

const SubmitFormButton: FC<SubmitButtonProps> = ({
  label = messages.save,
  onClick,
  ...rest
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <SubmitButton label={label} onClick={onClick} isLoading={isSubmitting} />
  );
};

export default SubmitFormButton;

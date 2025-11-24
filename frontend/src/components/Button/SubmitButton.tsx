import { Send as SendIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React, { FC } from "react";
import { RenderText } from "components/index";
import messages from "config/i18n/messages";
import { isDefined } from "utils/helper";

interface SubmitButtonProps {
  label?: any;
  onClick?: () => void;
  isLoading?: boolean;
  [x: string]: any;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  label = messages.save,
  onClick,
  isLoading,
  ...rest
}) => {
  return (
    <LoadingButton
      size="large"
      loading={isLoading}
      loadingPosition="end"
      endIcon={<SendIcon />}
      variant="contained"
      color="success"
      {...(isDefined(onClick) ? { onClick } : { type: "submit" })}
      {...rest}
    >
      <RenderText
        value={
          window.location.href.indexOf("edition") > -1 ? messages.send : label
        }
      />
    </LoadingButton>
  );
};

export default SubmitButton;

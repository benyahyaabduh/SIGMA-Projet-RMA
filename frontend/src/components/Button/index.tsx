import { Icon, lighten } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import React, { ComponentType, FC } from "react";

import { isDefined } from "utils/helper";

import RenderText from "../RenderText";

interface ButtonProps {
  label: string | object;
  onClick?: () => void;
  isDelete?: boolean;
  sx?: any;
  backgroundColor?: string;
  startIcon?: ComponentType;
  endIcon?: ComponentType;
  ref?: any;

  // endIcon?: ComponentType;
  [x: string]: any;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  startIcon,
  endIcon,
  backgroundColor,
  color = "#fff",
  sx,
  ref,
  ...rest
}) => {
  // const startIcon = isDefined(icon) ? icon : undefined;

  return (
    <MuiButton
      ref={ref}
      data-testid="save-button"
      variant="contained"
      disableElevation
      startIcon={startIcon && <Icon component={startIcon} fontSize="small" />}
      endIcon={endIcon && <Icon component={endIcon} fontSize="small" />}
      sx={{
        ...sx,
        ...(isDefined(backgroundColor)
          ? {
              color,
              backgroundColor,
              "&:hover": {
                color,
                backgroundColor:
                  backgroundColor && lighten(backgroundColor, 0.3),
              },
            }
          : {}),
      }}
      onClick={onClick}
      {...rest}
    >
      <RenderText value={label} />
    </MuiButton>
  );
};

export default Button;

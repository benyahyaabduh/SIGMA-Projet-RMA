import { Icon, Tooltip } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { ComponentType, FC } from "react";

import { isDefined } from "utils/helper";
import RenderText from "../RenderText";

interface IconButtonProps {
  icon: ComponentType;
  onClick?: (event?: any) => void;
  tooltip?: any;
  disabled?: boolean;
  squared?: boolean;
  fontSize?: any; //'inherit' | 'large' | 'medium' | 'small'

  [x: string]: any;
}

const IconButton: FC<IconButtonProps> = ({
  onClick,
  icon,
  tooltip,
  disabled,
  squared,
  fontSize = "small",
  ...rest
}) => {
  const buttonView = () => (
    <MuiIconButton
      aria-label="close"
      onClick={onClick}
      disabled={disabled}
      {...(isDefined(fontSize) && { size: fontSize })}
      {...rest}
      sx={{
        ...(squared && {
          bgcolor: `${rest?.color || "primary"}.main`, // 'secondary.main',
          color: "white",
          borderRadius: 1,
          "&.Mui-disabled": {
            cursor: null,
            bgcolor: "white", // 'secondary.main',
            color: `${rest?.color || "primary"}.main`,
            //bgcolor: "white",
            borderRadius: 1,
            //borderColor: `${rest?.color || 'primary'}.main`,
            //borderBottomWidth: 1
          },
        }),
        ...rest?.sx,
      }}
    >
      <Icon component={icon} {...(isDefined(fontSize) && { fontSize })} />
    </MuiIconButton>
  );

  if (isDefined(tooltip) && !disabled) {
    return (
      <Tooltip title={<RenderText value={tooltip} />} placement="bottom" arrow>
        {buttonView()}
      </Tooltip>
    );
  }

  return buttonView();
};

export default IconButton;

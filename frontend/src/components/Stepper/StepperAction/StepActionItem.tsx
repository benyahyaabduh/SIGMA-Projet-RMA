import React, { FC } from "react";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import { RenderText } from "components";

interface StepActionItemProps {
  label: string | object;
  isNext?: boolean;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const StepActionItem: FC<StepActionItemProps> = ({
  label,
  isNext = false,
  onClick,
  type,
}) => (
  <Button
    data-testid="vessel-action-next-button"
    variant="contained"
    size="large"
    type={type}
    // disableElevation
    startIcon={!isNext && <NavigateBeforeIcon />}
    endIcon={isNext && <NavigateNextIcon sx={{ fontSize: 12 }} />}
    onClick={onClick}
    // disabled={rowActionMenu.isCompleted()}
  >
    <RenderText value={label} />
  </Button>
);

export default StepActionItem;

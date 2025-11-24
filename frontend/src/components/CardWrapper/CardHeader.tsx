import React, { FC, ReactNode } from "react";
import { Box, Icon, Stack } from "@mui/material";
import MuiCardHeader from "@mui/material/CardHeader";
import { isArray } from "lodash";

import { isDefined, isDefinedAndNotEmpty } from "utils/helper";

interface CardHeaderProps {
  collapsable?: boolean;
  actions?: any;
  actionsProps?: any;
  headerProps?: any;
  expandButton?: ReactNode;

  [rest: string]: any;
}

const CardHeader: FC<CardHeaderProps> = ({
  avatar,
  icon,
  expandButton,
  actions,
  actionsProps,
  headerProps,
  ...rest
}) => {
  const actionWidgets = [];

  if (isDefined(actions)) {
    if (isArray(actions)) {
      actions.forEach((action) => {
        actionWidgets.push(action);
      });
    } else {
      actionWidgets.push(actions);
    }
  }

  if (isDefined(expandButton) && typeof expandButton !== "boolean") {
    actionWidgets.push(expandButton);
  }

  const action = isDefinedAndNotEmpty(actionWidgets) && (
    <Stack direction="row" alignItems="center" {...actionsProps}>
      {actionWidgets.map((item, index) => (
        <Box key={`widget-action-${index}`}>{item}</Box>
      ))}
    </Stack>
  );

  return (
    <MuiCardHeader
      avatar={
        isDefined(avatar)
          ? avatar
          : icon && (
              <Icon
                component={icon}
                sx={{
                  color: "secondary.main", // "#D46D3B"
                }}
              />
            )
      }
      titleTypographyProps={{
        fontWeight: 500,
        fontStretch: "normal",
        letterSpacing: "0.15px",
        lineHeight: 1.6,
        variant: "subtitle1",
        color: "secondary.main", // "#D46D3B", // "secondary.main",
        fontSize: 18,
        ...headerProps?.titleprops,
      }}
      action={action}
      {...headerProps}
      {...rest}
    />
  );
};

export default CardHeader;

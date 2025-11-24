import React, { ComponentType, FC, ReactNode } from "react";
import {
  AddOutlined as AddOutlinedIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@mui/icons-material";
import MuiCardContent from "@mui/material/CardContent";
import {
  Card,
  CardActions,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { isDefined } from "utils/helper";
import CardHeader from "components/CardWrapper/CardHeader";
import { RenderText } from "components";
import messages from "config/i18n/messages";

const CardContent = styled(MuiCardContent)(() => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: 0,
}));

interface CardWrapperProps {
  title?: string | object;
  avatar?: any;
  actions?: any;
  actionsProps?: any;
  children: any;
  containerProps?: any;
  stackProps?: any;
  // elevation?: number;
  icon?: ComponentType;
  hasBorder?: boolean;
  collapsable?: boolean;
  isExpanded?: boolean;
  footerActions?: ReactNode[];
  cardProps?: any;
  headerProps?: any;
  contentProps?: any;
  toolbar?: any;
}

const CardWrapper: FC<CardWrapperProps> = ({
  title,
  avatar,
  actions,
  actionsProps,
  containerProps,
  stackProps,
  footerActions,
  icon,
  hasBorder = false,
  collapsable = false,
  isExpanded = true,
  cardProps,
  headerProps,
  contentProps,
  toolbar,
  children,
}) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandButton = collapsable && (
    <Tooltip
      title={<RenderText value={expanded ? messages.hide : messages.show} />}
      placement="bottom"
      arrow
    >
      <IconButton aria-label="settings-expand" onClick={handleExpandClick}>
        {expanded ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );

  return (
    <Card
      {...cardProps}
      elevation={2}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "rgb(0 0 0 / 8%) 0px 10px 30px",
        border: hasBorder ? "1px solid rgba(168, 188, 197, 0.4)" : undefined,
        ...cardProps?.sx,
      }}
    >
      {isDefined(toolbar) && toolbar}
      {isDefined(title) || isDefined(avatar) ? (
        <CardHeader
          avatar={avatar}
          title={<RenderText value={title || ""} />}
          icon={icon}
          actions={actions}
          actionsProps={actionsProps}
          expandButton={ExpandButton}
          headerProps={headerProps}
          // onClick={handleExpandClick}
          {...(collapsable && {
            onClick: handleExpandClick,
            sx: { cursor: "pointer" },
          })}
        />
      ) : undefined}
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          height: 1,
          "& .MuiCollapse-wrapper": {
            height: 1,
          },
        }}
      >
        <CardContent
          sx={{
            p: 2,
            "&:last-child": {
              paddingBottom: 2,
            },
            ...contentProps?.sx,
          }}
        >
          {isDefined(containerProps) ? (
            <Grid
              container
              spacing={2}
              alignItems="center"
              alignContent="center"
              {...containerProps}
            >
              {children}
            </Grid>
          ) : isDefined(stackProps) ? (
            <Stack spacing={2} {...stackProps}>
              {children}
            </Stack>
          ) : (
            children
          )}
        </CardContent>
        {isDefined(footerActions) ? (
          <CardActions sx={{ borderTop: 1, borderColor: "divider" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              {...stackProps}
            >
              {footerActions}
            </Stack>
          </CardActions>
        ) : undefined}
      </Collapse>
    </Card>
  );
};

export default CardWrapper;

import React, { useRef, useState } from "react";
import {
  ExpandLess,
  ExpandMore,
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
  RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
} from "@mui/icons-material";
import {
  darken,
  Icon,
  IconButton,
  lighten,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import { CardWrapper, RenderText } from "components";
import { DRAWER_WIDTH } from "utils/constants";
import { isDefined } from "utils/helper";
import { AppRoute } from "types/AppRoute";
import { RoutePath } from "config/routes/path";

interface RouteItemProps {
  route: AppRoute;
  nested?: boolean;
  hasChildren?: boolean;
  isOpenDrawer?: boolean;
  handleMenuClick?: (route: AppRoute) => void;
}

const RouteItem = ({
  route,
  nested = false,
  hasChildren = false,
  isOpenDrawer = false,
  handleMenuClick = () => {},
}: RouteItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!route.isEnabled || hasChildren) e.preventDefault();
  };

  const isSelected =
    route.path === RoutePath.DASHBOARD
      ? location.pathname === route.path
      : location.pathname === route.path ||
        //location.pathname.includes(route.path as string) ||
        location.pathname.startsWith(route.path as string) ||
        (hasChildren &&
          route.subRoutes?.some(
            (subRoute) => location.pathname.startsWith(subRoute.path as string),
            // location.pathname.includes(subRoute.path as string)
          ));

  const icon = isDefined(route?.icon)
    ? route.icon
    : isSelected
    ? RadioButtonCheckedOutlinedIcon
    : RadioButtonUncheckedOutlinedIcon;

  const anchorEl = useRef(null);
  const [isPopoverOpen, setPopover] = useState(false);
  const handleClick = () => {
    setPopover(true);
  };
  const handleClose = () => {
    setPopover(false);
  };

  const authorities = hasChildren
    ? route.subRoutes?.flatMap((p) => p?.authorities) || []
    : route.authorities;

  const nestedStyle = {
    fontWeight: "bold",
    color: "#a7b8fe",
  };

  return (
    <NavLink
      to={`${route.path}`}
      key={route.key}
      onClick={handleNavigate}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton
        sx={{
          mr: "5px",
          pl: nested ? 3 : 1,
          cursor: !route.isEnabled ? "not-allowed" : "auto",
          color: !route.isEnabled ? theme.palette.text.secondary : "auto",
          "&:hover": {
            cursor: "pointer",
            borderRadius: 2,
            backgroundColor: darken("#D46D3B", 0.5),
            // color: darken("#D46D3B", 0.5),
          },
        }}
        onClick={() => handleMenuClick(route)}
      >
        <ListItemIcon>
          <IconButton
            ref={anchorEl}
            aria-haspopup="listbox"
            aria-controls="mouse-over-popover"
            aria-label="when device is locked"
            aria-expanded={anchorEl ? "true" : undefined}
            onMouseEnter={
              hasChildren && !isOpenDrawer ? handleClick : undefined
            }
            onMouseLeave={
              hasChildren && !isOpenDrawer ? handleClose : undefined
            }
            size="small"
            sx={{
              borderRadius: 2,
              bgcolor:
                isSelected && isDefined(route.icon)
                  ? lighten(theme.palette.primary.main, 0.6)
                  : null,
            }}
          >
            {icon && (
              <Icon
                component={icon}
                sx={{
                  ...(isSelected
                    ? { color: "secondary.main" }
                    : nested
                    ? nestedStyle
                    : { color: "#fff" }),
                }}
              />
            )}
          </IconButton>
          <Popover
            id="mouse-over-popover"
            open={isPopoverOpen}
            anchorEl={anchorEl.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            // onClose={handleClose}
            sx={{
              pointerEvents: "none",
            }}
            PaperProps={{
              onMouseEnter: handleClick,
              onMouseLeave: handleClose,
              sx: {
                pointerEvents: "auto",
                backgroundColor: "#1D2A5C",
                minWidth: DRAWER_WIDTH,
              },
            }}
          >
            <CardWrapper
              icon={route.icon}
              title={route.fullTitle || route.title}
              cardProps={{
                elevation: 0,
                sx: { p: 0, backgroundColor: "transparent" },
              }}
              contentProps={{ sx: { p: "5px" } }}
              headerProps={{
                titleprops: { fontSize: 16 },
                sx: {
                  borderBottom: "1px solid #D46D3B",
                },
              }}
            >
              {route.subRoutes
                ?.filter((p) => !p.isHidden)
                ?.map((subRoute) => (
                  <RouteItem key={`${subRoute.key}`} route={subRoute} nested />
                ))}
            </CardWrapper>
          </Popover>
        </ListItemIcon>
        {(nested || isOpenDrawer) && (
          <>
            <ListItemText
              primary={<RenderText value={route.title} />}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: "bold",
                // color: isSelected ? theme.palette.primary.main : "#fff",
                color: "#fff",
                // flexWrap: "wrap",
                // wordWrap: "break-word",
                whiteSpace: "normal",
                ...(isSelected
                  ? { color: "secondary.main", fontWeight: "bold" }
                  : nested
                  ? nestedStyle
                  : {}),
              }}
            />
            {hasChildren && (route.expanded ? <ExpandLess /> : <ExpandMore />)}
          </>
        )}
      </ListItemButton>
    </NavLink>
  );
};

export default RouteItem;

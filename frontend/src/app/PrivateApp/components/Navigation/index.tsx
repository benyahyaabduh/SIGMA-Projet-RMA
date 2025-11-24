import { alpha, Box, Collapse, List } from "@mui/material";
import React, { FC, useState } from "react";
import { AppRoute } from "types/AppRoute";
import routes from "config/routes/routes";
import RouteItem from "app/PrivateApp/components/RouteItem";
import SidebarDivider from "app/PrivateApp/components/Sidebar/SidebarDivider";

interface NavigationProps {
  isOpenDrawer?: boolean;
}

const Navigation: FC<NavigationProps> = ({ isOpenDrawer }) => {
  const [routesState, setRoutesStage] = useState<AppRoute[]>(routes);

  const handleMenuClick = (route: AppRoute) => {
    const items = routesState.map((item) => {
      if (item.key === route.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setRoutesStage(items);
  };

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: 3,
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: alpha("#AF7F1F", 0.2),
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "secondary.main",
          borderRadius: "16px",
        },
      }}
    >
      <List component="nav" sx={{ height: "100%", ml: 1 }}>
        {routesState
          .filter((p) => !p.isHidden)
          .map((route: AppRoute) => (
            <div key={route.key}>
              {route.subRoutes ? (
                <>
                  <RouteItem
                    key={`${route.key}`}
                    route={route}
                    hasChildren
                    handleMenuClick={handleMenuClick}
                    isOpenDrawer={isOpenDrawer}
                  />
                  {isOpenDrawer ? (
                    <Collapse in={route.expanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {route.subRoutes
                          .filter((p) => !p.isHidden)
                          .map((sRoute: AppRoute) => (
                            <RouteItem
                              key={`${sRoute.key}`}
                              route={sRoute}
                              isOpenDrawer={isOpenDrawer}
                              nested
                            />
                          ))}
                      </List>
                    </Collapse>
                  ) : undefined}
                </>
              ) : (
                <RouteItem
                  key={route.key}
                  route={route}
                  nested={false}
                  isOpenDrawer={isOpenDrawer}
                />
              )}
              {route.appendDivider && <SidebarDivider />}
            </div>
          ))}
      </List>
    </Box>
  );
};

export default Navigation;

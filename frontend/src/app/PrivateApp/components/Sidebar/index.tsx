import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { RenderText } from "components";
import { DRAWER_WIDTH } from "utils/constants";
import { closedMixin, openedMixin } from "config/theme/mixins";
import SidebarDivider from "app/PrivateApp/components/Sidebar/SidebarDivider";
import Navigation from "app/PrivateApp/components/Navigation";
import Version from "app/PrivateApp/components/Version";
import DrawerHeader from "app/PrivateApp/components/Sidebar/DrawerHeader";

const StyledTypography = styled(Typography)({
  fontSize: "25px",
  fontWeight: "bold",
  textTransform: "uppercase",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface NavigationProps {
  open: boolean | undefined;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const Sidebar = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: NavigationProps) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ width: "100%", pl: 2 }}
          >
            <Box sx={{ width: 1 }}>
              <Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <StyledTypography
                    sx={{
                      fontSize: 15,
                      whiteSpace: "normal",
                      textTransform: "none",
                    }}
                  >
                    <RenderText value="Système Tiers" />
                  </StyledTypography>
                  <StyledTypography sx={{ color: "#AF7F1F" }}>
                    <RenderText value="360" />
                  </StyledTypography>
                </Stack>
                <Divider
                  sx={{ height: "2px", bgcolor: "#AF7F1F", mt: "2px" }}
                />
              </Stack>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <SidebarDivider />
      <Navigation isOpenDrawer={open} />
      <SidebarDivider />
      <Version open={open} />
    </Drawer>
  );
};

export default Sidebar;

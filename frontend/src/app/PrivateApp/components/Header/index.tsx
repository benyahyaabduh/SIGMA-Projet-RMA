import React from "react";
import { styled, Box, Stack, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { DRAWER_WIDTH } from "utils/constants";
import { ReactComponent as RMALogo } from "assets/icons/rma-icon.svg";
import SearchBar from "app/PrivateApp/components/SearchBar";
import HeaderAction from "app/PrivateApp/components/HeaderAction";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
}

const Header = ({ open }: HeaderProps) => {
  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
        {!open && <Box sx={{ width: 50 }} />}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            pl: 1,
            flexGrow: 1,
          }}
        >
          <RMALogo />
          <Box sx={{ pl: 1, flexGrow: 1 }}>
            <SearchBar />
          </Box>
          <HeaderAction />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

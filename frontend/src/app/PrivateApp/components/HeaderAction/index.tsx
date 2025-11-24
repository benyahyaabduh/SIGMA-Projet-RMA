import React from "react";
import { Box, Stack } from "@mui/material";
import UserInfo from "app/PrivateApp/components/HeaderAction/UserInfo";

const AppHeaderAction = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <UserInfo />
    </Stack>
  );
};

export default AppHeaderAction;

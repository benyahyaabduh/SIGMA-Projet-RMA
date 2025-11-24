import React, { FC, SyntheticEvent, useState } from "react";
import MuiTabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import { Container, lighten, Stack, styled, Box, Tab } from "@mui/material";
import { first } from "lodash";

import { TabContextProps } from "types";
import { RenderText } from "components";

const StyledTabList = styled(TabList)(() => ({
  minHeight: 0,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  color: lighten(theme.palette.primary.main, 0.2),
  backgroundColor: lighten(theme.palette.primary.main, 0.9),
  minHeight: 0,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "red",
  },
  "&:first-of-type": {
    borderTopLeftRadius: 10,
  },
  "&:last-child": {
    borderTopRightRadius: 10,
  },
}));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  borderTopLeftRadius: 0,
  minHeight: 400,
}));

export const FilledTabContext: FC<TabContextProps> = ({
  tabs,
  initialTab,
  padding = 2,
  onChange,
  actions,
}) => {
  const [value, setValue] = useState(initialTab || first(tabs)?.value || "");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        typography: "body1",
        width: "100%",
      }}
    >
      <MuiTabContext value={value}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <StyledTabList
            onChange={handleTabChange}
            aria-label="lab API tabs example"
          >
            {tabs.map((item) => (
              <StyledTab
                wrapped
                key={item.value}
                value={item.value}
                label={<RenderText value={item.label} />}
                sx={{ minWidth: 200 }}
              />
            ))}
          </StyledTabList>
          <Stack direction="row" alignItems="center" justifyContent="center">
            {actions}
          </Stack>
        </Stack>

        {tabs.map((item) => (
          <StyledTabPanel key={item.value} value={item.value} sx={{ padding }}>
            <Container component={item.component} {...item.componentProps} />
          </StyledTabPanel>
        ))}
      </MuiTabContext>
    </Box>
  );
};

export default FilledTabContext;

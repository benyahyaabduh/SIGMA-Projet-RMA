import React, { FC, SyntheticEvent, useState } from "react";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { first } from "lodash";

import { CardWrapper, RenderText } from "components";

import { TabContextProps } from "types";
import TabPanel from "./components/TabPanel";

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.primary.main,
  minWidth: 150,
  minHeight: 0,
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabContext: FC<TabContextProps> = ({ tabs, initialTab, onChange }) => {
  const [value, setValue] = useState(initialTab || first(tabs)?.value || "");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CardWrapper>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          {tabs.map((item, index) => (
            <StyledTab
              wrapped
              key={item.value}
              value={item.value}
              label={<RenderText value={item.label} />}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </CardWrapper>
      <Box>
        {tabs.map((item, index) => (
          <TabPanel key={item.value} value={value} index={index} item={item}>
            <Container component={item.component} {...item.componentProps} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default TabContext;

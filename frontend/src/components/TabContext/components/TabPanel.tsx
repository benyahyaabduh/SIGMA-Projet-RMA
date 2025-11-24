import React from "react";
import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: string;
  item: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, item, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== item.value}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === item.value && (
        <Box sx={{ p: 0, pt: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;

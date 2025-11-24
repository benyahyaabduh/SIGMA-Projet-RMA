import React, { FC } from "react";
import { styled, Typography } from "@mui/material";
import { CardWrapper } from "components";

const StyledTypography = styled(Typography)({
  fontSize: 25,
  fontWeight: 600,
});

interface OverviewCardProps {
  data: { label: any; value: any };
}

const DashboardCard: FC<OverviewCardProps> = ({ data }) => {
  return (
    <CardWrapper
      title={data.label}
      headerProps={{ titleprops: { color: "#fff" } }}
      cardProps={{
        sx: {
          backgroundColor: "#3e5cee",
          color: "#f4d9d8",
          width: "100%",
          //minWidth: 200
        },
      }}
    >
      <StyledTypography>{data.value}</StyledTypography>
    </CardWrapper>
  );
};

export default DashboardCard;

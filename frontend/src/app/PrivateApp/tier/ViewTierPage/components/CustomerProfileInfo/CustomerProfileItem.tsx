import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  lighten,
  Typography,
  useTheme,
} from "@mui/material";
import { GridItem, RenderText } from "components";

const CustomerProfileItem = ({
  label,
  value,
  xs,
}: {
  label: any;
  value: any;
  xs?: any;
}) => {
  const theme = useTheme();

  return (
    <GridItem xs={xs}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${lighten(theme.palette.primary.main, 0.8)}`,
        }}
      >
        <CardHeader
          title={<RenderText value={label} />}
          titleTypographyProps={{
            fontWeight: 500,
            fontStretch: "normal",
            letterSpacing: "0.15px",
            lineHeight: 1.6,
            variant: "subtitle1",
            color: "primary.main", // "#D46D3B", // "secondary.main",
            fontSize: 14,
          }}
        />
        <CardContent
          sx={{
            p: 2,
            pt: 0,
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 500, color: "secondary.main" }}
          >
            <RenderText
              value={value}
              format={{
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
            />
          </Typography>
        </CardContent>
      </Card>
    </GridItem>
  );
};

export default CustomerProfileItem;

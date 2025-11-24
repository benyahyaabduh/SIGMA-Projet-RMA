import React, { FC } from "react";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { RenderText } from "components";
import AnnotationListItem from "app/PrivateApp/tier/ViewTierPage/components/AnnotationInfo/AnnotationListItem";

interface AnnotationItemProps {
  title: any;
  items?: any[];
}

const AnnotationList: FC<AnnotationItemProps> = ({ title, items = [] }) => {
  return (
    <Card>
      <CardHeader
        title={<RenderText value={title} />}
        titleTypographyProps={{
          fontWeight: 500,
          variant: "body1",
          color: "primary.main", // "#D46D3B", // "secondary.main",
          fontSize: 18,
        }}
      />
      <CardContent
        sx={{
          p: 1,
          "&:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Stack spacing={1} justifyContent="flex-start">
          {items.map((item) => (
            <AnnotationListItem data={item} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AnnotationList;

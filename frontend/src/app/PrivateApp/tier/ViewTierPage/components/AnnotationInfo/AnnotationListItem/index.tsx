import React, { FC, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { RenderText } from "components";

interface AnnotationListItemProps {
  data: any;
}

const AnnotationListItem: FC<AnnotationListItemProps> = ({ data }) => {
  // const [value, setValue] = useState<number | null>(2);

  return (
    <Box sx={{ bgcolor: "#f6f7fa", p: 1, borderRadius: 3 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ListItem sx={{ p: 0 }}>
            <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
              <Avatar sx={{ height: 30, width: 30 }}>
                <ImageIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={data.author}
              secondary={data.createdAt}
              primaryTypographyProps={{
                sx: {
                  fontSize: 12,
                  fontWeight: 500,
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontSize: 11,
                  fontWeight: 500,
                  fontStyle: "italic",
                },
              }}
            />
          </ListItem>
        </Grid>
        <Grid item xs>
          <Typography sx={{ fontSize: 14 }}>
            <RenderText value={data.text} />
          </Typography>
        </Grid>
        <Grid item>
          <Rating
            name="simple-controlled"
            size="small"
            value={data?.score || 0}
            max={3}
            readOnly
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
        </Grid>
      </Grid>

      {/*<Stack spacing={0}>*/}
      {/*  <ListItem sx={{ p: 0 }}>*/}
      {/*    <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>*/}
      {/*      <Avatar sx={{ height: 35, width: 35 }}>*/}
      {/*        <ImageIcon fontSize="small" />*/}
      {/*      </Avatar>*/}
      {/*    </ListItemAvatar>*/}
      {/*    <ListItemText*/}
      {/*      primary={data.author}*/}
      {/*      secondary={data.createdAt}*/}
      {/*      primaryTypographyProps={{*/}
      {/*        sx: {*/}
      {/*          fontSize: 13,*/}
      {/*          fontWeight: 500,*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      secondaryTypographyProps={{*/}
      {/*        sx: {*/}
      {/*          fontSize: 12,*/}
      {/*          fontWeight: 500,*/}
      {/*          fontStyle: "italic",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </ListItem>*/}
      {/*  <Typography sx={{ fontSize: 14 }}>*/}
      {/*    <RenderText value={data.text} />*/}
      {/*  </Typography>*/}
      {/*</Stack>*/}
    </Box>
  );
};

export default AnnotationListItem;

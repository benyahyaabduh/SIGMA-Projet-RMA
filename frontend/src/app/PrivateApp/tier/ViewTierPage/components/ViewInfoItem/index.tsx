import React, { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Container,
  Icon,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import MuiCardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import {
  HLabelTypography,
  HValueTypography,
} from "components/ViewField/HorizViewField";
import { IconButton, RenderText } from "components";
import ExpandButton from "components/Button/ExpandButton";
import {
  ArrowRightOutlined as ArrowRightOutlinedIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import { isEmpty } from "lodash";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CircleIcon from "@mui/icons-material/Circle";

interface ViewInfoItemProps {
  label: any;
  items: any[];
  value?: any;
  spacing?: number;
  expanded?: boolean;
  hasBorder?: boolean;
  child: FC<any>;
}

const CardHeader = styled(MuiCardHeader)(({ theme }) => ({
  // color: theme.palette.primary.main,
  // fontSize: 18,
  // fontWeight: "bold",
  // textTransform: "uppercase",
  "& .MuiCardHeader-avatar": {
    marginRight: 2,
  },
}));

const ViewInfoItem: FC<ViewInfoItemProps> = ({
  label,
  items,
  value,
  spacing,
  expanded = false,
  hasBorder = false,
  child,
}) => {
  const [open, setOpen] = useState(expanded);

  return (
    <Card
      elevation={0}
      {...(hasBorder && {
        sx: { border: "1px solid rgba(168, 188, 197, 0.4)" },
      })}
    >
      <CardHeader
        avatar={
          <Icon
            component={open ? ArrowDropDownIcon : ArrowRightOutlinedIcon}
            fontSize="small"
            sx={{ color: "primary.main" }}
          />
        }
        title={
          <HLabelTypography>
            <RenderText value={label} />
          </HLabelTypography>
        }
        // subheader="September 14, 2016"
        action={
          <Stack direction="row" alignItems="center">
            <HValueTypography>
              <RenderText value={value} />
            </HValueTypography>
            <ExpandButton
              open={open}
              disabled={isEmpty(items)}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </Stack>
        }
        {...(!hasBorder && { sx: { pt: 0.5, pb: 0.5, pl: 0, pr: 1 } })}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            p: 0,
            // pl: 1,
            // pr: 1,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Stack spacing={spacing || 0} sx={{ p: 1 }}>
            {items?.map((item: any) => (
              <Box sx={{ width: 1 }}>
                <Container component={child} data={item} />
              </Box>
            ))}
            {/*{items?.map((item: any) => (*/}
            {/*  <Stack direction="row" alignItems="start" spacing={0}>*/}
            {/*    <Box>*/}
            {/*      <ArrowRightOutlinedIcon*/}
            {/*        fontSize="small"*/}
            {/*        sx={{ color: "primary.main" }}*/}
            {/*      />*/}
            {/*    </Box>*/}
            {/*    /!*<ListItemIcon sx={{ minWidth: 0, pr: 1, color: "inherit" }}>*!/*/}
            {/*    /!*  <ArrowRightOutlinedIcon fontSize="small" />*!/*/}
            {/*    /!*</ListItemIcon>*!/*/}
            {/*    <Box sx={{ width: 1 }}>*/}
            {/*      <Container component={child} data={item} />*/}
            {/*    </Box>*/}
            {/*  </Stack>*/}
            {/*))}*/}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ViewInfoItem;

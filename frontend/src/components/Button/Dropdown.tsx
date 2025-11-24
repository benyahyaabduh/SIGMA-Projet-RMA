import React, { FC, useEffect, useState } from "react";
import {
  alpha,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { isDefined, isNotDefined } from "utils/helper";
import { first } from "lodash";
import { LoadingButton } from "@mui/lab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RenderText } from "components/index";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "8px",
    borderRadius: "16px",
    border: `8px solid ${alpha(
      "#6e7d9c",
      // theme.palette.background.dataTableActionMenuBorder,
      0.1,
    )}`,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      padding: "3px 20px 3px 20px",
      opacity: 0.95,
      fontWeight: 500,
      letterSpacing: "0.11px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&, & .MuiListItemIcon-root": {
        minWidth: 20,
      },
      "&.Mui-selected": {
        backgroundColor: "#6743e3", //"#5e84ff", // "#6743e3",
        color: "#fff",
        borderRadius: 16,
        "&, & .MuiListItemIcon-root": {
          minWidth: 20,
          color: "#fff",
        },
      },
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: alpha("#6743e3", 0.1), //"#5e84ff", // "#6743e3",
      color: "#fff",
      borderRadius: 16,
      "&, & .MuiListItemIcon-root": {
        minWidth: 20,
        color: "#fff",
      },
    },
  },
}));

interface DropdownProps {
  label?: any;
  data: any[];
  onChange?: (data: any) => void;
  selectedItem?: any;
  isHidden?: boolean;
  isLoading?: boolean;
  optionLabel?: string;
  [x: string]: any;
}

const Dropdown = ({
  label,
  data = [],
  onChange,
  isLoading = false,
  selectedItem = null,
  isHidden = false,
  optionLabel = "label",
  ...rest
}: DropdownProps) => {
  const [selected, setSelected] = useState<any>(null);

  //console.log("PickerButton selected", selected);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (item: any) => {
    setSelected(item);
    setAnchorEl(null);
    if (typeof onChange === "function") {
      onChange(item);
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    //console.log("PickerButton useEffect 1");
    if (isDefined(data) && isNotDefined(selected)) {
      //console.log("PickerButton useEffect 2");
      handleMenuItemClick(isDefined(selectedItem) ? selectedItem : first(data));
    }
  }, [data, selected]);

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        {isDefined(label) && (
          <Typography
            sx={{ color: "secondary.main", fontWeight: 500, fontSize: "1rem" }}
          >
            <RenderText value={label} />
          </Typography>
        )}
        <LoadingButton
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableElevation
          onClick={handleClick}
          loading={isLoading}
          loadingIndicator="Loading..."
          endIcon={<KeyboardArrowDownIcon />}
          // sx={{ pt: 0, pb: 0 }}
          style={{ textTransform: "capitalize" }}
          size="small"
          {...rest}
          {...(isHidden
            ? { sx: { display: "none" } }
            : { sx: { p: 1, pt: 0, pb: 0 } })}
        >
          <ListItemText sx={{ minHeight: 0 }}>
            <RenderText value={selected} display={optionLabel} />
          </ListItemText>
        </LoadingButton>
      </Stack>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: 180,
            //bgcolor: colors.gdBlue1,
          },
        }}
      >
        {data.map((item: any, index: number) => (
          <MenuItem
            key={`${index}`}
            disableRipple
            selected={item.id === selected?.id}
            onClick={() => handleMenuItemClick(item)}
            // sx={{ minWidth: 200 }}
          >
            <ListItemText>
              <RenderText value={item} display={optionLabel} />
            </ListItemText>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default Dropdown;

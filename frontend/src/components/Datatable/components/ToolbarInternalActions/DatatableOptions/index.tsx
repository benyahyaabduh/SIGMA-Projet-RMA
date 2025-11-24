import React, { useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  FileDownload as FileDownloadIcon,
  FilterListOff as FilterListOffIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Refresh as RefreshIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { Condition, RenderText } from "components";
import messages from "config/i18n/messages";
import SmallAvatar from "components/Datatable/components/SmallAvatar";
import { isDefined } from "utils/helper";
import { toast } from "react-toastify";

const DatatableOptionBtn = ({ open, onClick }: any) => {
  return (
    <Tooltip title={<RenderText value={messages.options} />}>
      <SmallAvatar>
        <IconButton aria-label="Example" onClick={onClick}>
          {open ? (
            <KeyboardArrowUpIcon sx={{ color: "supported.header.user" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "supported.header.user" }} />
          )}
        </IconButton>
      </SmallAvatar>
    </Tooltip>
  );
};

const DatatableOptionMenuItem = ({ option, index, onClick }: any) => {
  return (
    <MenuItem
      key={`${option.value}.${index}`}
      onClick={() => onClick(option)}
      sx={{ "& .MuiListItemIcon-root": { minWidth: 25 } }}
      disabled={option.disabled}
    >
      <Condition isValid={isDefined(option.icon)}>
        <ListItemIcon>
          <Icon component={option.icon} />
        </ListItemIcon>
      </Condition>
      <ListItemText>
        <RenderText value={option.label} />
      </ListItemText>
    </MenuItem>
  );
};

const DatatableOptions = ({ table, options = [] }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const { onExportModal } = useExport();
  // const tableActions = [];

  const handleOpenAction = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (option: any) => {
    handleCloseAction();

    if (typeof option?.onClick === "function") {
      option?.onClick(option);
    }
  };

  const onExportHandler = (table: any) => {
    toast.warning("Pending...");
    console.log("DatatableOptions onExportHandler", table.getState().title);
    // onExportModal({
    //   tableId: table.id,
    //   // table, //Causing some issue in Toolbar
    //   columns: table.options.columns,
    //   // data: rows,
    //   rows: table.options.data,
    //   options: table.options,
    //   fileName: table.getState().title,
    //   // data: allRows1.map((row) => row.original),
    //   // columns: columns,
    // });
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <DatatableOptionBtn open={open} onClick={handleOpenAction} />
      <Menu
        sx={{ mt: "40px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseAction}
      >
        {options
          .concat([
            {
              value: "refresh",
              label: messages.refresh,
              icon: RefreshIcon,
              onClick: table.getState().onRefresh,
              disabled: false,
            },
            {
              value: "clearAllFilters",
              label: messages.clearAllFilters,
              icon: FilterListOffIcon,
              onClick: () => table.resetColumnFilters(true),
              disabled: table.getState().columnFilters.length === 0,
            },
            {
              value: "clearAllSorting",
              label: messages.clearAllSorting,
              icon: SortIcon,
              onClick: () => table.resetSorting(true),
              disabled: table.getState().sorting.length === 0,
            },
            {
              value: "exportData",
              label: messages.exportData,
              icon: FileDownloadIcon,
              onClick: () => onExportHandler(table),
              disabled: false,
            },
          ])
          .map((option: any, index: number) => (
            <DatatableOptionMenuItem
              index={index}
              onClick={onMenuItemClick}
              option={option}
            />
          ))}
      </Menu>
    </Box>
  );
};

export default DatatableOptions;

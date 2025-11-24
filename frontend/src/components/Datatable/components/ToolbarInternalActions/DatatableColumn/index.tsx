import React, { useState } from "react";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import { ViewList as ViewListIcon } from "@mui/icons-material";
import MRT_ShowHideColumnsMenu from "./MRT_ShowHideColumnsMenu";
import { RenderText } from "components";
import messages from "config/i18n/messages";
import FilterPopper from "components/Datatable/components/ToolbarCustomActions/components/FilterPopper";

const DatatableColumn = ({ table }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Tooltip title={<RenderText value={messages.columns} />}>
        <IconButton
          id="datatable-column-button"
          aria-label="datatable-column-button"
          onClick={handleClick}
          disabled={false}
          size="small"
          //sx={{ color }}
          //{...rest}
        >
          <ViewListIcon />
        </IconButton>
      </Tooltip>
      <FilterPopper
        id="datatable-column-id"
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{
          width: 330,
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <MRT_ShowHideColumnsMenu table={table} />
          </div>
        </ClickAwayListener>
      </FilterPopper>
    </React.Fragment>
  );
};

export default DatatableColumn;

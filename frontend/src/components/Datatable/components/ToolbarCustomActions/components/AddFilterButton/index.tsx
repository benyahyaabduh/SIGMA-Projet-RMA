import React from "react";
import FilterPopper from "components/Datatable/components/ToolbarCustomActions/components/FilterPopper";
import { ClickAwayListener } from "@mui/material";
import FilterAutocomplete from "components/Datatable/components/ToolbarCustomActions/components/FilterAutocomplete";
import ToolbarAddButton from "components/Datatable/components/ToolbarCustomActions/components/ToolbarAddButton";
import messages from "config/i18n/messages";
import { isEmpty } from "lodash";

const AddFilterButton = ({ data, columns, onChange, ...rest }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClickHandler = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseHandler = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const onChangeHandler = (event: any, newValue: any, reason: any) => {
    if (
      event.type === "keydown" &&
      event.key === "Backspace" &&
      reason === "removeOption"
    ) {
      return;
    }

    if (typeof onChange === "function") {
      // onChange([...data, newValue.accessorKey]);
      onChange(newValue.accessorKey);
    }

    onCloseHandler();
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-selector-label" : undefined;

  const options = columns
    .filter(
      ({ id, columnDef, getIsFiltered }: any) =>
        !id.startsWith("mrt-row") &&
        columnDef.enableColumnFilter !== false &&
        !getIsFiltered(),
    )
    .map(({ columnDef }: any) => columnDef);

  return (
    <React.Fragment>
      <ToolbarAddButton
        label={messages.filter}
        onClick={onClickHandler}
        disabled={isEmpty(options)}
        variant="text"
        {...rest}
      />
      <FilterPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={onCloseHandler}>
          <div>
            <FilterAutocomplete
              value={null}
              mode={{ code: "equals" }}
              onClose={onCloseHandler}
              optionLabel="header"
              optionKey="accessorKey"
              onChange={onChangeHandler}
              options={options}
            />
          </div>
        </ClickAwayListener>
      </FilterPopper>
    </React.Fragment>
  );
};

export default AddFilterButton;

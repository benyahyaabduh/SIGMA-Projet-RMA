import * as React from "react";
import { useEffect, useMemo } from "react";
import PopupState from "material-ui-popup-state";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { first } from "lodash";
import { isDefined, isDefinedAndNotEmpty, isNotDefined } from "utils/helper";
import { modeOptions } from "components/Datatable/services/modeOptions";
import { Condition, RenderText } from "components";
import messages from "config/i18n/messages";

const FilterByMode = ({
  value,
  onChange,
  onChangeValue,
  column,
  disabled = false,
}: any) => {
  // console.log("FilterByMode value", column, value);
  const { columnDef } = column;
  const { enableColumnFilterModes, columnFilterModeOptions, _filterFn } =
    columnDef;
  const onSelectHandler = (option: any) => {
    if (typeof onChange === "function") {
      onChange(option);
      if (typeof onChange === "function") {
        onChangeValue(null);
      }
    }
  };

  const options = useMemo(
    () =>
      isDefinedAndNotEmpty(columnFilterModeOptions)
        ? modeOptions.filter((option: any) =>
            columnFilterModeOptions.includes(option.code),
          )
        : modeOptions,
    [columnFilterModeOptions],
  );

  useEffect(() => {
    if (isNotDefined(value)) {
      // console.log("FilterByMode _filterFn", _filterFn);

      onSelectHandler(
        isDefined(_filterFn) && _filterFn !== "fuzzy"
          ? options.find((option) => option.code === _filterFn)
          : first(options),
      );
    }
  }, [_filterFn, options, value]);

  return (
    <PopupState variant="popover" popupId="demoMenu">
      {(popupState) => (
        <React.Fragment>
          <Tooltip title={<RenderText value={messages.changeFilterMode} />}>
            <ListItemButton
              dense
              {...bindTrigger(popupState)}
              disabled={disabled || enableColumnFilterModes === false}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 1, fontWeight: "bold" }}>
                <Condition
                  isValid={isDefined(value?.symbol)}
                  fallback={<FilterListIcon fontSize="small" />}
                >
                  {value?.symbol}
                </Condition>
              </ListItemIcon>
              <ListItemText
                primary={<RenderText value={value?.label || "Select mode"} />}
              />
              <Icon
                component={popupState.isOpen ? ExpandLess : ExpandMore}
                fontSize="small"
              />
            </ListItemButton>
          </Tooltip>
          <Menu {...bindMenu(popupState)}>
            {options.map((option, index) => (
              <MenuItem
                key={`filterMode-${option.code}-${index}`}
                selected={option.code === value?.code}
                onClick={() => {
                  popupState.close();
                  onSelectHandler(option);
                }}
              >
                <ListItemIcon>
                  <Box sx={{ fontSize: "1.25rem", width: "2ch" }}>
                    {option.symbol}
                  </Box>
                </ListItemIcon>
                <ListItemText>
                  <RenderText value={option.label} />
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default FilterByMode;

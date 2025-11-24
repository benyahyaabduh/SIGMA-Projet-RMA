import { Autocomplete, Box, useTheme } from "@mui/material";
import React from "react";
import { isMultipleSelect } from "utils/helper";
import { has } from "lodash";
import { BpCheckbox, BpRadio, RenderText } from "components";
import FilterTextField from "components/Datatable/components/ToolbarCustomActions/components/FilterTextField";
import PopperComponent from "components/Datatable/components/ToolbarCustomActions/components/PopperComponent";
import { Close as CloseIcon } from "@mui/icons-material";

const FilterAutocomplete = ({
  value,
  options,
  optionLabel,
  optionKey,
  onClose,
  onChange,
  mode,
}: any) => {
  const theme = useTheme();
  const multiple = isMultipleSelect(mode);
  // console.log("FilterAutocomplete value", mode, value, options);

  return (
    <Autocomplete
      open
      multiple={multiple}
      onClose={(event, reason) => {
        if (reason === "escape") {
          onClose();
        }
      }}
      value={value || (multiple ? [] : null)}
      // value={null}
      onChange={onChange}
      disableCloseOnSelect
      PopperComponent={PopperComponent}
      renderTags={() => null}
      noOptionsText="No labels"
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {multiple ? (
            <BpCheckbox checked={selected} sx={{ p: 0, ml: 1 }} />
          ) : (
            <BpRadio checked={selected} sx={{ p: 0, ml: 1 }} />
          )}
          {/*<BpCheckbox checked={selected} sx={{ p: 0, ml: 1 }} />*/}
          <Box
            component="span"
            sx={{
              width: 14,
              height: 14,
              flexShrink: 0,
              borderRadius: "3px",
              mr: 1,
              mt: "2px",
            }}
            style={{ backgroundColor: option.color }}
          />
          <Box
            sx={{
              flexGrow: 1,
              "& span": {
                color: theme.palette.mode === "light" ? "#586069" : "#8b949e",
              },
            }}
          >
            {has(option, "header") ? (
              <RenderText value={option.header} />
            ) : (
              option[optionLabel]
            )}
            <br />
            <span>{option.description}</span>
          </Box>
          <Box
            component={CloseIcon}
            sx={{ opacity: 0.6, width: 18, height: 18 }}
            style={{
              visibility: selected ? "visible" : "hidden",
            }}
          />
        </li>
      )}
      options={options}
      getOptionLabel={(option) => option[optionLabel]}
      isOptionEqualToValue={(option, value) =>
        option[optionKey] === value[optionKey]
      } //Use in PricingStrategySelect
      // renderInput={(params) => (
      //   <StyledInput
      //     ref={params.InputProps.ref}
      //     inputProps={params.inputProps}
      //     // autoFocus={!multiple}
      //     placeholder="Filter labels"
      //     disabled={!multiple}
      //     size="small"
      //   />
      // )}
      renderInput={(params) => (
        <FilterTextField
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          autoFocus={!multiple}
          placeholder="Filter labels"
          // disabled
          // inputProps={{
          //   ...params.inputProps,
          //   // autoComplete: "off",
          //   // disabled: true,
          //   // readOnly: true,
          // }}
        />
      )}
    />
  );
};

export default FilterAutocomplete;

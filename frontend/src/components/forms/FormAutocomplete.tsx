import React, { FC, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { has } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { ApiProps, Option } from "./Form/useFetchRef"; // ⚠️ importer types depuis useFetchRef
import {
  buildName,
  getErrorBy,
  isDefined,
  isDefinedAndNotEmpty,
  isNotDefined,
} from "utils/helper";
import { GridItem } from "components/index";
import { useGetApi } from "config/api/useApi";
import InputWrapper from "components/forms/InputWrapper";

type FormAutocompleteProps = {
  name: string;
  nameProps?: string;
  label?: any;
  required?: boolean;
  error?: boolean;
  options?: Option[];
  optionLabel?: string;
  optionKey?: string;
  multiple?: boolean;
  disabled?: boolean;
  xs?: number | boolean;
  onChange?: (value: any) => void;
  apiProps?: ApiProps<Option>;
  filterFn?: (options: Option[]) => Option[];
  [x: string]: any;
};

const FormAutocomplete: FC<FormAutocompleteProps> = ({
  name: fieldName,
  nameProps,
  label,
  options,
  optionLabel = "libelle",
  optionKey = "id",
  multiple,
  required,
  disabled = false,
  xs,
  isCellMode = false,
  onChange,
  apiProps,
  filterFn,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  // ❌ avant : useGetApi<Option[]>(apiProps)
  const { data, isLoading } = useGetApi(apiProps);

  const additionalProps = (params: any) =>
    isCellMode
      ? {
          label: null,
          inputTextAlign: "center",
          InputProps: {
            ...params.InputProps,
            disableUnderline: false,
            sx: {
              bgcolor: "transparent",
            },
          },
        }
      : {};

  // ✅ cast data pour forcer le typage
  const formattedOptions: Option[] = isDefined(data)
    ? (data as Option[])
    : isDefinedAndNotEmpty(options)
    ? options!
    : [];

  const loading = open && isLoading && !disabled && isNotDefined(options);
  const name = buildName({ name: fieldName, prefix: nameProps });

  return (
    <GridItem xs={xs}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, onChange: onFieldChange, ...field } }) => (
          <Autocomplete<Option, boolean>
            {...field}
            fullWidth
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            autoHighlight={false}
            multiple={multiple}
            disabled={disabled || isSubmitting}
            loading={loading}
            options={
              filterFn ? filterFn(formattedOptions) : formattedOptions
            }
            onChange={(_, newData) => {
              onFieldChange(newData);
              if (onChange) {
                onChange(newData);
              }
            }}
            getOptionLabel={(option: Option) => {
              if (has(option, optionLabel)) {
                return (option as any)[optionLabel] || "N/A";
              }
              return option?.libelle || option?.code || "Undefined";
            }}
            isOptionEqualToValue={(option: Option, value: Option) => {
              if (has(option, optionKey)) {
                return (option as any)[optionKey] === (value as any)[optionKey];
              }
              return option?.id === value?.id;
            }}
            renderInput={(params) => {
              const error = getErrorBy({ name, errors });
              return (
                <InputWrapper label={label} required={required}>
                  <TextField
                    required={required}
                    {...params}
                    fullWidth
                    inputRef={ref}
                    variant={isCellMode ? "standard" : "outlined"}
                    {...additionalProps(params)}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    error={!!error}
                    helperText={!!error && error.message}
                  />
                </InputWrapper>
              );
            }}
            {...rest}
          />
        )}
      />
    </GridItem>
  );
};

export default FormAutocomplete;

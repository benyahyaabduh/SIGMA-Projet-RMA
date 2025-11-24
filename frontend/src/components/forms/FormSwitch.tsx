import React, { FC } from "react";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { GridItem, RenderText } from "components/index";
import { buildName } from "utils/helper";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

type FormSwitchProps = {
  name: string;
  nameProps?: string;
  label: string | object;
  xs?: number;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
};

const FormSwitch: FC<FormSwitchProps> = ({
  name: fieldName,
  nameProps,
  label,
  xs,
  required,
  disabled = false,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const name = buildName({ name: fieldName, prefix: nameProps });

  return (
    <GridItem xs={xs}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            control={
              <IOSSwitch checked={field.value} sx={{ m: 1 }} size="small" />
            }
            label={<RenderText value={label} />}
            required={required}
            disabled={disabled || isSubmitting}
          />
        )}
      />
    </GridItem>
  );
};

export default FormSwitch;

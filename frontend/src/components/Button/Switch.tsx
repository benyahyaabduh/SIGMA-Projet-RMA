import React, { FC } from "react";
import {
  Container,
  FormControlLabel,
  styled,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import MuiSwitch from "@mui/material/Switch";
import { RenderText } from "components/index";

const IOSSwitch = styled((props: MuiSwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
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

export const AntSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

//SwitchProps
interface SwitchProps {
  value: boolean;
  label?: any;
  required?: boolean;
  disabled?: boolean;
  mode?: "IOS" | "Ant";
  field?: any;
  isSubmitting?: boolean;
  [x: string]: any;
}

const Switch: FC<SwitchProps> = ({
  label,
  value,
  required = false,
  disabled = false,
  mode = "IOS",
  field,
  isSubmitting = false,
  ...rest
}) => {
  const dd = (
    <FormControlLabel
      {...field}
      control={
        mode === "IOS" ? (
          <IOSSwitch checked={value} sx={{ m: 1 }} size="small" />
        ) : (
          <AntSwitch checked={value} sx={{ m: 1 }} size="small" />
        )
      }
      label={<RenderText value={label} />}
      required={required}
      disabled={disabled || isSubmitting}
      {...rest}
    />
  );

  // return (
  //   <FormControlLabel control={<MuiSwitch defaultChecked />} label="Label" />
  // );

  return dd;
};

export default Switch;

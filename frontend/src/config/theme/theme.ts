import { createTheme, darken, responsiveFontSizes, Theme } from "@mui/material";
import { red } from "@mui/material/colors";

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "utils/constants";

import colors from "config/theme/colors";

export const getAppTheme = (
  mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME,
): Theme => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#234585",
        light: "#fff",
        dark: "#1D2A5C",
        contrastText: "#fff",
      },
      secondary: {
        main: "#D46D3B", // '#AF7F1F'
      },
      // info: {
      //     main: '#a7b4ce'
      // },
      error: {
        // main: red.A400
        main: red.A700,
      },
      background: {
        default: "#f2f2f2",
        paper: colors.white,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            color: "#1D2A5C",
            backgroundColor: "#fff",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#1D2A5C",
            color: "#fff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            fontSize: 16,
            textTransform: "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label": {
              color: colors.gdBlue1,
            },
            "& label.Mui-focused": {
              color: colors.gdBlue1,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#3E68A8",
            },
            "& .MuiButtonBase-root": {
              color: colors.gdBlue1,
            },
            "& .MuiSvgIcon-root": {
              color: colors.gdBlue1,
            },
            "& .Mui-disabled": {
              backgroundColor: darken("#fff", 0.1),
              borderColor: darken("#fff", 0.1), // "#3E68A8",
              // opacity: 0.7,
            },
            "& .MuiOutlinedInput-root": {
              // padding: 0,
              color: colors.gdBlue1,
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.85,
              letterSpacing: "0.1px",
              "& fieldset": {
                borderColor: colors.generalLightBlue1,
              },
              "&:hover fieldset": {
                borderColor: colors.generalLightBlue1,
                borderWidth: "0.15rem",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.generalLightBlue1, // "#3E68A8",
              },
              //TODO not appropriate for small
              // "& .MuiInputBase-input": {
              //   // padding: "14px",
              // },
              "& .MuiAutocomplete-input": {
                // padding: "15px",
                padding: "4.5px",
              },
              "& .MuiSvgIcon-root": {
                color: "#AF7F1F",
              },
              "& .Mui-disabled": {
                backgroundColor: darken("#fff", 0.1),
                borderColor: darken("#fff", 0.1),
              },
            },
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #fff inset",
                WebkitTextFillColor: colors.gdBlue1,
              },
            },
            textarea: {
              padding: 0,
              "&:-webkit-autofill": {
                padding: 0,
                WebkitBoxShadow: "0 0 0 100px #fff inset",
                WebkitTextFillColor: colors.gdBlue1,
              },
            },
          },
        },
      },
      // MuiTypography: {
      //   styleOverrides: {
      //     root: {
      //       wordWrap: "break-word",
      //     },
      //   },
      // },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

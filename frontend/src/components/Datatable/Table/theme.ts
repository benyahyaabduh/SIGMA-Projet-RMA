import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
import colors from "config/theme/colors";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#3a4b95",
      },
      secondary: {
        main: "#1d2442",
      },
      // background: {
      //   default: "#ffffff",
      //   // header: "#eff3fa",
      //   dataTableActionMenuBorder: colors.generalLightBlue2,
      // },
      // text: {
      //   // header: "#6e7d9c",
      //   // filterBtn: "#ffffff",
      //   viewFieldValue: colors.gdBlue1,
      // },
    },
    typography: {
      fontFamily: ["Poppins", '"Regular"'].join(","),
      fontSize: 12,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            "& .MuiMenu-paper": {
              //bgcolor: colors.gdBlue1,
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: "inherit",
            maxHeight: "500px",
            width: "100%",
            margin: "0px",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: alpha("#a1a9d0", 0.2),
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#a1a9d0",
              borderRadius: "16px",
            },
          },
        },
      },
      // MuiTableHeadCell: {
      //   styleOverrides: {
      //     root: {
      //       alignItems: "center",
      //       justifyContent: "center",
      //       // backgroundColor: "#eff3fa",
      //       background: "#8947ce",
      //       color: "#6e7d9c",
      //       fontSize: 13,
      //       fontWeight: "bold",
      //       borderBottom: 0,
      //       paddingBottom: 0,
      //       "&:first-of-type": {
      //         borderRadius: "1em 0 0 1em",
      //         paddingLeft: "10px",
      //       },
      //       "&:last-child": {
      //         borderRadius: "0 1em 1em 0",
      //         paddingRight: "3px",
      //       },
      //     },
      //   },
      // },
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
            "& .MuiOutlinedInput-root": {
              color: colors.gdBlue1,
              fontSize: "12px",
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
            },
          },
        },
      },
    },
  }),
);

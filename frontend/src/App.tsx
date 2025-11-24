import React, { useMemo, useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import { fr } from "date-fns/locale";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "utils/constants";
import { getAppTheme } from "config";
import { IntlProvider } from "react-intl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import frMessages from "config/i18n/translations/fr.json";

import { ThemeContext } from "context";
import NotFoundPage from "app/NotFoundPage";
import { RoutePath } from "config/routes/path";
import PrivateApp from "app/PrivateApp";
import routes from "config/routes/routes";
import { AppRoute } from "types/AppRoute";
import { addRouteParam } from "utils/helper";
import { endsWith } from "lodash";
import { Log } from "oidc-client-ts";
import oidcConfig from "config/oidcConfig";
import { AuthProvider } from "react-oidc-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      networkMode: "always",
      // mutation options
    },
  },
});

// setDefaultOptions({ locale: fr });

const App = () => {
  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(LIGHT_MODE_THEME);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME,
        );
      },
    }),
    [],
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  Log.setLogger(console);
  Log.setLevel(Log.DEBUG);

  const addRoute = (route: AppRoute) => {
    const path = route?.path || "/";
    const updatedPath =
      endsWith(route.key, "form") && route.isHidden
        ? addRouteParam(path)
        : path;

    return (
      <Route
        key={route.key}
        path={updatedPath}
        element={<Container component={route.component || NotFoundPage} />}
      />
    );
  };

  return (
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale="fr" defaultLocale="fr" messages={frMessages}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <ThemeContext.Provider value={themeMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <RecoilRoot>
                    <Routes>
                      <Route path="*" element={<NotFoundPage />} />
                      <Route
                        path={RoutePath.DASHBOARD}
                        element={<PrivateApp />}
                      >
                        {routes.map((route: AppRoute) =>
                          route.subRoutes
                            ? route.subRoutes.map((item: AppRoute) =>
                                addRoute(item),
                              )
                            : addRoute(route),
                        )}
                      </Route>
                    </Routes>
                  </RecoilRoot>
                  <ToastContainer autoClose={3500} />
                </BrowserRouter>
              </ThemeProvider>
            </ThemeContext.Provider>
          </LocalizationProvider>
        </IntlProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;

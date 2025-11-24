import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "app/ErrorFallbackPage";
import { RoutePath } from "config/routes/path";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "app/PrivateApp/components/Sidebar";
import DrawerHeader from "app/PrivateApp/components/Sidebar/DrawerHeader";
import NavigationLink from "app/PrivateApp/components/NavigationLink";
import SupportingDocumentModal from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm/SupportingDocumentModal";
import AddressModal from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm/AddressModal";
import PolicyModal from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm/PolicyModal";
import ContactModal from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm/ContactModal";
import ConfirmModal from "components/ConfirmModal";
import { useRecoilState } from "recoil";
import { isDrawerOpenAtom } from "app/PrivateApp/components/Sidebar/actions/drawerAtom";
import DeleteModal from "components/DeleteModal";
import AnnotationModal from "app/PrivateApp/annotation/annotationModal";
import { hasAuthParams, useAuth } from "react-oidc-context";
import { PageError, PageLoader } from "components";
import messages from "config/i18n/messages";

const PrivateApp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState(isDrawerOpenAtom);
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth?.isAuthenticated &&
      !auth?.activeNavigator &&
      !auth?.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth?.isLoading) {
    return <PageLoader vHeight={0} />;
  }

  if (!auth?.isAuthenticated) {
    return <PageError message={messages.unableToLogin} vHeight={0} />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackPage}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        navigate(RoutePath.DASHBOARD);
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} />
        <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Box
          component="main"
          overflow="auto"
          height="100vh"
          width="100%"
          flexDirection="column"
          display="flex"
          p={3}
        >
          <DrawerHeader />
          <NavigationLink />
          <Box sx={{ pt: 3 }}>
            <Outlet />
            <SupportingDocumentModal />
            <AddressModal />
            <PolicyModal />
            <ContactModal />
            <ConfirmModal />
            <DeleteModal />
            <AnnotationModal />
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default PrivateApp;

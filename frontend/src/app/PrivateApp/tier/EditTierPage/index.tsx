import React from "react";
import { useLocation } from "react-router-dom";
import { formatTierFromApi } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import TierForm from "app/PrivateApp/tier/NewTierPage/TierForm";
import messages from "config/i18n/messages";
import { PageWrapper } from "components";

const EditTierPage = () => {
  const location = useLocation();
  return (
    <PageWrapper
      title={messages.editTier}
      // title={`${intl.formatMessage(messages.editTier)}`}
      // isLoading={isLoading}
      // isError={isError}
      // isSuccess={isSuccess}
    >
      <TierForm data={formatTierFromApi(location?.state)} />
    </PageWrapper>
  );
};

export default EditTierPage;

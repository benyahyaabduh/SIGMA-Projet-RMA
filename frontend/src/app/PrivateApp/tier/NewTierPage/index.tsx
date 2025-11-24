import React from "react";
import TierForm from "app/PrivateApp/tier/NewTierPage/TierForm";
import messages from "config/i18n/messages";
import { PageWrapper } from "components";

const NewTierPage = () => {
  return (
    <PageWrapper title={messages.newTier}>
      <TierForm />
    </PageWrapper>
  );
};

export default NewTierPage;

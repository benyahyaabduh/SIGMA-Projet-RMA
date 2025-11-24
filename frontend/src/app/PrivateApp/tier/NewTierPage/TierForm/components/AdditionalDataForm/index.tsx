import React from "react";
import { Stack } from "@mui/material";
import ContactForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm";
import AddressForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm";

const AdditionalDataForm = ({ name = "additional" }: { name?: string }) => {
  return (
    <Stack spacing={2}>
      <ContactForm name={name} />
      <AddressForm name={name} />
    </Stack>
  );
};

export default AdditionalDataForm;

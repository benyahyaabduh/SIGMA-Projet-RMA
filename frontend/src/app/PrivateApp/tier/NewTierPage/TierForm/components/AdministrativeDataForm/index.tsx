import React from "react";
import { Stack } from "@mui/material";
import MaritalStatusForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdministrativeDataForm/MaritalStatusForm";
import CompanyInfoForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdministrativeDataForm/CompanyInfoForm";
import { useFormContext, useWatch } from "react-hook-form";
import OtherInfoForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdministrativeDataForm/OtherInfoForm";

const AdministrativeDataForm = ({ name = "info" }: { name: string }) => {
  const { control } = useFormContext();

  const natureClient = useWatch({
    control,
    name: "init.natureClient",
  });

  return (
    <Stack spacing={2}>
      {natureClient?.code === "M" ? (
        <CompanyInfoForm name={name} />
      ) : (
        <MaritalStatusForm name={name} />
      )}
      <OtherInfoForm name={name} />
    </Stack>
  );
};

export default AdministrativeDataForm;

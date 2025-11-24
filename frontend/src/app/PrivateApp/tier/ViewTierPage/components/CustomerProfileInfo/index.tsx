import React from "react";
import messages from "config/i18n/messages";
import { PortraitOutlined as PortraitOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, GridItem, RenderText } from "components";
import { useGetApi } from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";
import {
  Card,
  CardContent,
  CardHeader,
  lighten,
  Typography,
  useTheme,
} from "@mui/material";
import { isDefined } from "utils/helper";
import Dropdown from "components/Button/Dropdown";
import CustomerProfileItem from "app/PrivateApp/tier/ViewTierPage/components/CustomerProfileInfo/CustomerProfileItem";

const CustomerProfileInfo = ({ data }: { data: any }) => {
  const { data: profile } = useGetApi({
    url: ApiRoutes.CUSTOMER_PROFILE,
    enabled: isDefined(data),
    method: "POST",
    params: {
      codeClient: data?.codeClient,
      intermediaires: [data?.intermediaire],
      nombreDeMois: 12,
      typeUtilisateur: "SIEGE",
    },
  });

  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.customerProfile}
      icon={PortraitOutlinedIcon}
      collapsable
      isExpanded={false}
      actions={
        <Dropdown
          label={messages.period}
          data={[
            { id: 1, label: "Derniers 12 mois" },
            { id: 2, label: "Derniers 6 mois" },
            { id: 3, label: "Derniers 3 mois" },
          ]}
        />
      }
    >
      <CustomerProfileItem
        label={messages.totalPremiumForCurrentContracts}
        value={profile?.primeTotalDesContracts}
        xs={4}
      />
      <CustomerProfileItem
        label={messages.numberOfCurrentContracts}
        value={profile?.nombreDeContract}
        xs={4}
      />
      <CustomerProfileItem
        label={messages.totalPremiumForCurrentContracts}
        value={profile?.anciennete}
        xs={4}
      />
      <CustomerProfileItem
        label={messages.totalPremiumForCurrentContracts}
        value={profile?.nombreDeReclamations}
        xs={4}
      />
      <CustomerProfileItem
        label={messages.totalPremiumForCurrentContracts}
        value={profile?.nombreDeSinistre}
        xs={4}
      />
    </CardWrapper>
  );
};

export default CustomerProfileInfo;

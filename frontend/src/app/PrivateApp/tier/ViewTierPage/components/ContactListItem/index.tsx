import React, { FC } from "react";
import { Box, Stack } from "@mui/material";
import { RenderText, Switch } from "components";
import { HValueTypography } from "components/ViewField/HorizViewField";
import messages from "config/i18n/messages";

interface ContactListItemProps {
  data: any;
}

const ContactListItem: FC<ContactListItemProps> = ({ data }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <Box>
      <RenderText value={data?.typeMoyenContact} />
    </Box>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 1,
      }}
    >
      <HValueTypography>
        <RenderText value={data?.moyenContact} />
      </HValueTypography>
      <Switch value={data?.estPrincipale} label={messages.main} mode="Ant" />
      <Switch value={data?.estActif} label={messages.active} mode="Ant" />
    </Box>
  </Stack>
);

export default ContactListItem;

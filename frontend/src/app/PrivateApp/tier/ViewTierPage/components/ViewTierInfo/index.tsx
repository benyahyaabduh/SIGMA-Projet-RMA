import React, { useState } from "react";
import messages from "config/i18n/messages";
import {
  Button,
  CancelButton,
  CardWrapper,
  RenderText,
  ViewField,
} from "components";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  AddOutlined as AddOutlinedIcon,
  Edit as EditIcon,
  FeedOutlined as FeedOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@mui/icons-material";

import { buildTierFullName } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import ViewInfoItem from "app/PrivateApp/tier/ViewTierPage/components/ViewInfoItem";
import ContactListItem from "app/PrivateApp/tier/ViewTierPage/components/ContactListItem";
import DocumentListItem from "app/PrivateApp/tier/ViewTierPage/components/DocumentListItem";
import { formatCreatedAudit, formatUpdatedAudit } from "utils/helper";
import { RoutePath } from "config/routes/path";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 18,
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const TierTypeItem = ({ data }: any) => {
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemIcon sx={{ minWidth: 0, pr: 1, color: "inherit" }}>
        <FeedOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={<RenderText value={data} />}
        primaryTypographyProps={{
          sx: {
            fontWeight: 500,
            fontStretch: "normal",
            letterSpacing: "0.15px",
            lineHeight: 1.6,
            variant: "subtitle1",
          },
        }}
      />
    </ListItem>
  );
};

const ShowMoreOrLessInfo = ({ data }: { data: any }) => {
  const [open, setVisibility] = useState(false);

  return (
    <Stack spacing={2}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack spacing={1}>
          <ViewField
            direction="row"
            label={messages.titleCivility}
            value={data?.titreCivilite}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.firstName}
            value={data?.prenom}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.lastName}
            value={data?.nom}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.gender}
            value={data?.genre}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.familySituation}
            value={data?.situationFamiliale}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.dateOfBirth}
            value={data?.dateNaissance}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.placeOfBirth}
            value={data?.lieuNaissance}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.cityOfBirth}
            value={data?.villeNaissance}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.nationality}
            value={data?.nationnalite}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.profession}
            value={data?.profession}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.numberOfChildren}
            value={data?.nombreEnfants}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.salaryBracket}
            value={data?.trancheSalaire}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.manager}
            value={data?.responsable}
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.codeIntermediate}
            value={data?.intermediaire}
            display="code"
            hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.created}
            value={formatCreatedAudit(data)}
            // hasBorder={false}
          />
          <ViewField
            direction="row"
            label={messages.updated}
            value={formatUpdatedAudit(data)}
            // hasBorder={false}
          />
        </Stack>
      </Collapse>
      <Button
        label={open ? messages.showLessInfo : messages.showMoreInfo}
        endIcon={open ? RemoveOutlinedIcon : AddOutlinedIcon}
        backgroundColor="#f2f2f2"
        color="#D46D3B"
        onClick={() => {
          setVisibility(!open);
        }}
      />
    </Stack>
  );
};

const ViewTierInfoAction = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(RoutePath.TIER_EDIT, {
      state: data,
    });
  };

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <CancelButton label={messages.return} fullWidth />
        <Button
          label={messages.editTier}
          startIcon={EditIcon}
          onClick={onEditHandler}
          fullWidth
        />
        {/*<Button*/}
        {/*  label={messages.newTier}*/}
        {/*  startIcon={AddOutlinedIcon}*/}
        {/*  fullWidth*/}
        {/*/>*/}
      </Stack>
      {/*<CancelButton label={messages.close} />*/}
    </Stack>
  );
};

const ViewTierInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 2 }}
      title={messages.customerInfo}
      icon={PersonOutlinedIcon}
    >
      <StyledTypography>
        <RenderText value={buildTierFullName(data)} />
      </StyledTypography>
      <Stack spacing={1}>
        <Divider />
        <Stack direction="row">
          <TierTypeItem data={data?.typeClient} />
          <TierTypeItem data={data?.natureClient} />
        </Stack>
        <Divider />
      </Stack>

      <Stack spacing={1}>
        <ViewField
          direction="row"
          label={messages.id}
          value={data?.id}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.version}
          value={data?.version}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.image}
          value={data?.image}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.codeClient}
          value={data?.codeClient}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.tierType}
          value={data?.typeTier}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.customerStatus}
          value={data?.etatClient}
          hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.intermediate}
          value={data?.intermediaire}
          display="nom"
          hasBorder={false}
        />
      </Stack>
      <ViewInfoItem
        label={messages.contacts}
        items={data?.moyenContacts}
        child={ContactListItem}
        expanded
      />
      <ViewInfoItem
        label={messages.supportingDocument}
        items={data?.identifications}
        spacing={1}
        child={DocumentListItem}
        expanded
      />
      <ShowMoreOrLessInfo data={data} />
      <ViewTierInfoAction data={data} />
    </CardWrapper>
  );
};

export default ViewTierInfo;

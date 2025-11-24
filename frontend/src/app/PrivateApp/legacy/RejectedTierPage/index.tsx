import React from "react";
import messages from "config/i18n/messages";
import { Datatable, PageWrapper } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Edit as EditIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { RoutePath } from "config/routes/path";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColumnType } from "components/Datatable/services/columnType";
import TierNameCell from "components/Datatable/components/TierNameCell";

const defaultColumns = [
  {
    accessorKey: "id",
    header: messages.id,
    size: 50,
  },
  {
    accessorKey: "image",
    header: messages.image,
    size: 50,
  },
  {
    accessorKey: "codeApplication",
    header: messages.code,
    size: 50,
  },
  {
    accessorKey: "rejectCode",
    header: messages.rejectCode,
  },
  {
    accessorKey: "rejectReason",
    header: messages.rejectReason,
    minSize: 400,
  },
  {
    accessorKey: "codeClient",
    header: messages.codeClient,
    enableClickToCopy: true,
  },
  {
    accessorKey: "typeTiers",
    header: messages.tierType,
    size: 100,
  },
  {
    accessorKey: "codeIntermediaire",
    header: messages.intermediate,
  },
  // {
  //   accessorKey: "prenom",
  //   header: messages.firstName,
  //   minSize: 200,
  // },
  // {
  //   accessorKey: "nom",
  //   header: messages.lastName,
  //   minSize: 200,
  // },
  // {
  //   accessorKey: "raisonSociale",
  //   header: messages.socialReason,
  //   minSize: 300,
  // },
  {
    accessorKey: "nom",
    header: messages.tier,
    Cell: TierNameCell,
    minSize: 300,
  },
  // {
  //   accessorKey: "createdBy",
  //   header: messages.createdBy,
  // },
  {
    accessorKey: "createdAt",
    header: messages.createdAt,
    columnType: ColumnType.Datetime,
    size: 200,
  },
  // {
  //   accessorKey: "updatedBy",
  //   header: messages.updatedBy,
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: messages.updatedAt,
  //   columnType: ColumnType.Date,
  // },
  // {
  //   accessorKey: "libelleAdresse",
  //   header: messages.address,
  //   minSize: 300,
  // },
  // {
  //   accessorKey: "ville",
  //   header: messages.city,
  // },
  // {
  //   accessorKey: "pays",
  //   header: messages.country,
  // },
  // {
  //   accessorKey: "secteur",
  //   header: messages.sector,
  // },
  // {
  //   accessorKey: "telephone",
  //   header: messages.telephone,
  // },
  // {
  //   accessorKey: "fax",
  //   header: messages.fax,
  // },
  // {
  //   accessorKey: "telex",
  //   header: messages.telex,
  // },
  // {
  //   accessorKey: "vip",
  //   header: messages.vip,
  // },
  // {
  //   accessorKey: "codeSegment",
  //   header: messages.segment,
  // },
  // {
  //   accessorKey: "codeMoyenContact",
  //   header: messages.customerContact,
  // },
  // {
  //   accessorKey: "statut",
  //   header: messages.status,
  // },
  // {
  //   accessorKey: "codeUtilisateur",
  //   header: messages.user,
  // },
  // {
  //   accessorKey: "raisonSociale",
  //   header: messages.socialReason,
  //   minSize: 300,
  // },
  // {
  //   accessorKey: "siteWeb",
  //   header: messages.urlSiteWeb,
  // },
  // {
  //   accessorKey: "formeJuridique",
  //   header: messages.legalForm,
  // },
  // {
  //   accessorKey: "filialeGroupe",
  //   header: messages.groupSubsidiary,
  // },
  // {
  //   accessorKey: "activite",
  //   header: messages.activity,
  // },
  // {
  //   accessorKey: "sigleCommercial",
  //   header: messages.acronym,
  // },
  // {
  //   accessorKey: "dateCreationLegale",
  //   header: messages.legalCreationDate,
  //   minSize: 230,
  // },
  // {
  //   accessorKey: "dateDebutActivite",
  //   header: messages.activityStartDate,
  // },
  // {
  //   accessorKey: "dateFinActivite",
  //   header: messages.activityEndDate,
  // },
  // {
  //   accessorKey: "capital",
  //   header: messages.capital,
  // },
  // {
  //   accessorKey: "nbrSalarie",
  //   header: messages.numberOfEmployees,
  // },
  // {
  //   accessorKey: "responsable",
  //   header: messages.manager,
  // },
  // {
  //   accessorKey: "titre",
  //   header: messages.titleCivility,
  // },
  // {
  //   accessorKey: "prenom",
  //   header: messages.firstName,
  //   minSize: 200,
  // },
  // {
  //   accessorKey: "nom",
  //   header: messages.lastName,
  //   minSize: 200,
  // },
  // {
  //   accessorKey: "dateNaissance",
  //   header: messages.dateOfBirth,
  // },
  // {
  //   accessorKey: "lieuNaissance",
  //   header: messages.placeOfBirth,
  // },
  // {
  //   accessorKey: "sexe",
  //   header: messages.gender,
  // },
  // {
  //   accessorKey: "situationFamille",
  //   header: messages.familySituation,
  // },
  // {
  //   accessorKey: "nationalite",
  //   header: messages.nationality,
  // },
  // {
  //   accessorKey: "profession",
  //   header: messages.profession,
  // },
  // {
  //   accessorKey: "gsm",
  //   header: messages.mobilePhone,
  // },
  // {
  //   accessorKey: "email",
  //   header: messages.email,
  // },
  // {
  //   accessorKey: "capaciteJuridique",
  //   header: messages.legalCapacity,
  // },
  // {
  //   accessorKey: "paysNaissance",
  //   header: messages.countryOfBirth,
  // },
  // {
  //   accessorKey: "villeNaissance",
  //   header: messages.cityOfBirth,
  // },
  // {
  //   accessorKey: "numPermis",
  //   header: messages.licenseNumber,
  // },
  // {
  //   accessorKey: "dateDelivrancePermis",
  //   header: messages.dateOfIssueOfPermit,
  //   minSize: 230,
  // },
  // {
  //   accessorKey: "villeDelivrancePermis",
  //   header: messages.cityIssuePermit,
  //   minSize: 230,
  // },
  // {
  //   accessorKey: "paysDelivrancePermis",
  //   header: messages.countryIssueOfPermit,
  //   minSize: 230,
  // },
  // {
  //   accessorKey: "matricule",
  //   header: messages.registrationNumber,
  // },
  // {
  //   accessorKey: "nbrEnfant",
  //   header: messages.numberOfChildren,
  // },
  // {
  //   accessorKey: "revenu",
  //   header: messages.income,
  // },
  // {
  //   accessorKey: "dateDeces",
  //   header: messages.dateDeath,
  // },
  // {
  //   accessorKey: "statutDeces",
  //   header: messages.deathStatus,
  // },
  // {
  //   accessorKey: "codeScore",
  //   header: messages.codeScore,
  // },
  // {
  //   accessorKey: "segScore",
  //   header: messages.segmentScore,
  // },
  // {
  //   accessorKey: "dateMajScr",
  //   header: messages.dateUpdated,
  // },
  // {
  //   accessorKey: "typeAdresse",
  //   header: messages.addressType,
  // },
  //
];

const RejectedTierPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title={messages.rejectedTier}>
      <Datatable
        title={messages.tiers}
        columns={defaultColumns}
        apiProps={{
          url: ApiRoutes.FETCH_REJECTED_SYNC,
        }}
        displayColumnDefOptions={{ "mrt-row-actions": { size: 80 } }}
        initialState={{ columnPinning: { right: ["mrt-row-actions"] } }}
        enablePagination
        rowActionMenu={[
          {
            label: messages.view,
            icon: VisibilityOutlinedIcon,
            onClick: (row) => {
              navigate(RoutePath.TIER_LEGACY_VIEW, {
                state: row,
              });
            },
          },
          {
            label: messages.edit,
            icon: EditIcon,
            onClick: (row) => {
              navigate(RoutePath.TIER_LEGACY_EDIT, {
                state: row,
              });
            },
          },
          {
            label: messages.delete,
            icon: DeleteOutlineOutlinedIcon,
            onClick: (row) => {
              toast.warning("Pending...");
            },
          },
        ]}
      />
    </PageWrapper>
  );
};

export default RejectedTierPage;

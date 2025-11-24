import React from "react";
import messages from "config/i18n/messages";
import { Datatable, PageWrapper } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { ColumnType } from "components/Datatable/services/columnType";
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { RoutePath } from "config/routes/path";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TierNameCell from "components/Datatable/components/TierNameCell";

const defaultColumns = [
  {
    accessorKey: "id",
    header: messages.id,
    size: 50,
  },
  {
    accessorKey: "version",
    header: messages.version,
    size: 50,
  },
  {
    accessorKey: "codeClient",
    header: messages.codeClient,
    enableClickToCopy: true,
    size: 50,
  },
  {
    accessorKey: "image",
    header: messages.image,
    size: 50,
  },
  // {
  //   accessorKey: "prenom",
  //   header: messages.firstName,
  // },
  // {
  //   accessorKey: "nom",
  //   header: messages.lastName,
  // },
  // {
  //   accessorKey: "raisonSociale",
  //   header: messages.socialReason,
  // },
  {
    accessorKey: "nom",
    header: messages.tier,
    Cell: TierNameCell,
    minSize: 200,
  },
  {
    accessorKey: "intermediaire.nom",
    header: messages.intermediate,
    minSize: 200,
  },
  {
    accessorKey: "createdAt",
    header: messages.createdAt,
    columnType: ColumnType.Datetime,
  },
];

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title={messages.history}>
      <Datatable
        title={messages.archivedCustomers}
        columns={defaultColumns}
        apiProps={{
          url: ApiRoutes.SEARCH_TIER_HISTORY,
          method: "POST",
          params: {
            // codeClient: 11111,
          },
        }}
        displayColumnDefOptions={{ "mrt-row-actions": { size: 80 } }}
        // initialState={{ density: "compact" }}
        enablePagination
        rowActionMenu={[
          {
            label: messages.view,
            icon: VisibilityOutlinedIcon,
            onClick: (row) => {
              navigate(RoutePath.TIER_HISTORY_VIEW, {
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

export default HistoryPage;

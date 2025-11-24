import React, { ChangeEvent, ComponentType, useState } from "react";
import messages from "config/i18n/messages";
import {
  Comment as CommentIcon,
  WorkHistoryOutlined as WorkHistoryOutlinedIcon,
} from "@mui/icons-material";
import { CardWrapper, Datatable, RenderText } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { isDefined } from "utils/helper";
import { formatDistance } from "date-fns";
import AnnotationListItem from "app/PrivateApp/tier/ViewTierPage/components/AnnotationInfo/AnnotationListItem";
import { useFetchApi } from "config/api/useApi";
import { groupBy } from "lodash";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListSubheader,
  Pagination,
  Stack,
} from "@mui/material";
import AnnotationList from "app/PrivateApp/tier/ViewTierPage/components/AnnotationInfo/AnnotationList";
import { ThreeDots } from "react-loader-spinner";
import AnnotationForm from "app/PrivateApp/tier/ViewTierPage/components/AnnotationInfo/AnnotationForm";

const defaultColumns = [
  {
    accessorKey: "category.libelle",
    header: messages.category,
  },
  {
    accessorKey: "text",
    header: messages.text,
    enableClickToCopy: true,
  },
  {
    accessorKey: "createdAt",
    header: messages.creationDate,
  },
  {
    accessorKey: "score",
    header: messages.score,
  },
  {
    accessorKey: "author",
    header: messages.authorName,
  },
];

interface AnnotationInfoProps {
  title: any;
  data: any;
  category: "RECOUVREMENT" | "SINISTRE";
  icon?: ComponentType;
}

const AnnotationInfo = ({
  title,
  data,
  category,
  icon,
}: AnnotationInfoProps) => {
  const pageSize = 3;
  const codeClient = data?.codeClient;
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    data: { rows, meta } = {},
    isLoading,
    isError,
    isFetching,
    refetch: onRefresh,
  } = useFetchApi({
    url: ApiRoutes.SEARCH_ANNOTATIONS,
    enabled: isDefined(codeClient) && isDefined(category),
    method: "POST",
    // columnFilters: [
    //   { id: "codeClient", value: codeClient },
    //   { id: "typeUtilisateur", value: "SIEGE" },
    //   {
    //     id: "category",
    //     value: {
    //       code: category,
    //     },
    //   },
    // ],
    params: {
      page,
      pageSize,
      codeClient,
      // intermediaires: [data?.intermediaire?.code],
      typeUtilisateur: "SIEGE",
      category: {
        code: category,
      },
    },
    formatter: (rows) =>
      rows.map((row) => ({
        text: row.texte,
        score: row.score,
        author: `${row.nomAuteur} - ${row.codeAuteur}`,
        category: row.categorieAnnotation?.code,
        createdAt: formatDistance(new Date(row.dateCreation), new Date(), {
          addSuffix: true,
        }),
      })),
  });

  // console.log("AnnotationInfo data", meta, data);

  return (
    <CardWrapper
      title={title}
      icon={icon}
      cardProps={{ sx: { height: 1 } }}
      // footerActions={[
      //   <Pagination
      //     count={Math.ceil(meta?.totalElements / pageSize)}
      //     page={page}
      //     onChange={handleChange}
      //     size="small"
      //     variant="outlined"
      //     shape="rounded"
      //     disabled={isLoading || isFetching}
      //   />,
      // ]}
      {...(meta?.totalElements !== 0 && {
        footerActions: [
          <Pagination
            count={Math.ceil(meta?.totalElements / pageSize)}
            page={page}
            onChange={handleChange}
            size="small"
            variant="outlined"
            shape="rounded"
            disabled={isLoading || isFetching}
          />,
        ],
      })}
    >
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#e98927"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible
        />
      ) : (
        <Stack spacing={1}>
          {rows?.map((item: any, index: number) => (
            <AnnotationListItem key={`row-annotation-${index}`} data={item} />
          ))}
          <AnnotationForm data={data} category={category} />
        </Stack>
      )}
    </CardWrapper>
  );
};

export default AnnotationInfo;

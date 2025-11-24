import { useQuery } from "@tanstack/react-query";
import { has, isArray, isNull, isUndefined } from "lodash";
import useApi from "config/api/useApi";
import { isDefined, isDefinedAndNotEmpty } from "utils/helper";
import { buildApiUrl } from "config/api/apiHelper";

// Définition générique pour apiProps
export type ApiProps<T> = {
  url: string;
  params?: Record<string, any>;
  enabled?: boolean;
  formatter?: (data: T[]) => T[];
  filter?: (item: T) => boolean;
};

// Type de base pour une option
export type Option = {
  id: string | number;
  code?: string;
  libelle?: string;
  name?: string;
  default?: boolean;
  [key: string]: any;
};

const useFetchRef = ({
  apiProps,
  options,
}: {
  apiProps?: ApiProps<Option>;
  options?: Option[];
}) => {
  const api = useApi();

  const queryKeys = [];
  if (isDefinedAndNotEmpty(apiProps)) {
    queryKeys.push(apiProps?.url);
    queryKeys.push(apiProps?.params);
  }

  return useQuery({
    queryKey: queryKeys,
    enabled: isDefined(apiProps) && apiProps?.enabled,
    queryFn: () =>
      api
        .get(buildApiUrl(apiProps), { params: apiProps?.params })
        .then((response) => {
          const respData = response.data;
          const content =
            has(respData, "content") && !isArray(respData)
              ? respData?.content
              : respData;

          const mergedData: Option[] = (
            !isUndefined(options) && !isNull(options) ? options : []
          ).concat(content);

          if (has(apiProps, "formatter")) {
            return has(apiProps, "filter")
              ? apiProps?.formatter?.(mergedData)?.filter(apiProps?.filter!)
              : apiProps?.formatter?.(mergedData);
          }

          const filteredData = has(apiProps, "filter")
            ? mergedData?.filter(apiProps!.filter!)
            : mergedData;

          return filteredData.map((item: Option) => ({
            ...item,
            id: item?.id,
            value: item?.id,
            code: item?.code,
            isDefault: item?.default,
            label: item?.name || item?.libelle || item?.code || "Undefined",
          }));
        }),
  });
};

export default useFetchRef;

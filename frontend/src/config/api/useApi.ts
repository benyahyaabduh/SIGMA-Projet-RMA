import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { has, isArray, isUndefined, orderBy } from "lodash";

import { isDefined, isDefinedAndNotEmpty, showErrorToast } from "utils/helper";
import { buildQuery, buildQueryUrl } from "config/api/apiHelper";
import { ApiProps } from "types";
import { AppConfig } from "config/AppConfig";
import { useIntl } from "react-intl";

export const useFetchApi = (props: ApiProps) => {
  console.log("useFetchApi props", props);
  const api = useApi();

  const isEnabled = isDefinedAndNotEmpty(props) && props.enabled !== false;

  const { queryUrl, queryKeys, queryParams, searchParams } = buildQuery(props);
  console.log("useFetchApi", { queryUrl, queryKeys, queryParams });
  // console.log("useFetchApi searchParams", extractQueryParams(searchParams));

  //api.post(`${ApiRoutes.SAVE_PRIME_CLOSING}/${data?.id}`, formatPrimeToApi(data))
  return useQuery({
    //TODO to be fixed
    // keepPreviousData: true,
    queryKey: queryKeys,
    enabled: isEnabled,
    queryFn: async () => {
      return (
        props.method === "POST"
          ? api.post(queryUrl, queryParams)
          : api.get(queryUrl, {
              params: searchParams,
            })
      ).then(({ data }) => {
        // console.log("useFetchApi data", data);
        const items = !isArray(data) ? data?.data || data?.content : data;
        // console.log("useFetchApi items", items);

        const formattedData =
          typeof props?.formatter === "function"
            ? props?.formatter(items)
            : items;
        // console.log("useFetchApi formattedData", formattedData);

        const orderedRows = isArray(formattedData)
          ? orderBy(
              formattedData.map((row) => ({ ...row })),
              ["id"],
              ["desc"],
            )
          : formattedData;
        // console.log("useFetchApi orderedRows", orderedRows);

        if (isArray(data)) {
          return orderedRows;
        }

        const totalElements = data.total || data.totalElements;

        return {
          rows: orderedRows,
          meta: { totalElements },
        };
      });
    },
  });
};

export const useGetById = (props: ApiProps) => {
  const api = useApi();

  const queryKeys = [props.url];
  const pathVariable = props?.pathVariable;
  if (isDefined(pathVariable)) {
    queryKeys.push(`${pathVariable}`);
  }

  return useQuery({
    queryKey: queryKeys,
    enabled: isDefined(props) && props?.enabled,
    queryFn: () =>
      api.get(buildQueryUrl(props)).then(({ data }) => {
        if (typeof props?.formatter === "function") {
          return props?.formatter(data);
        }
        return data;
      }),
  });
};

export const useGetApi = (apiProps: ApiProps | undefined) => {
  // console.log("useGetApi props", props);
  const api = useApi();
  const intl = useIntl();

  const { queryUrl, queryKeys, queryParams, searchParams } =
    buildQuery(apiProps);
  // console.log("useGetApi buildQuery", queryUrl, queryKeys, queryParams);

  // const queryKeys = [];
  // if (isDefinedAndNotEmpty(props)) {
  //   queryKeys.push(props?.url);
  //   if (isDefined(props?.pathVariable)) {
  //     queryKeys.push(props?.pathVariable);
  //   }
  //
  //   if (isDefined(props?.params)) {
  //     queryKeys.push(props?.params);
  //   }
  // }

  return useQuery({
    queryKey: queryKeys,
    enabled: isDefined(apiProps) && apiProps?.enabled,
    queryFn: () =>
      // api
      //   .get(buildQueryUrl(props), { params: props?.params })
      (apiProps?.method === "POST"
        ? api.post(queryUrl, queryParams)
        : api.get(queryUrl, {
            params: searchParams,
          })
      ).then((response) => {
        const respData = response.data;
        const content =
          has(respData, "content") && !isArray(respData)
            ? respData?.content
            : respData;

        if (!isUndefined(apiProps?.formatter)) {
          return isUndefined(apiProps?.filter)
            ? apiProps?.formatter(content)
            : apiProps?.formatter(content)?.filter(apiProps?.filter);
        }

        if (!isUndefined(apiProps?.intlFormatter)) {
          return isUndefined(apiProps?.filter)
            ? apiProps?.intlFormatter({ intl, data: content })
            : apiProps
                ?.intlFormatter({ intl, data: content })
                ?.filter(apiProps?.filter);
        }

        const filteredData = isUndefined(apiProps?.filter)
          ? content
          : content?.filter(apiProps?.filter);

        if (isArray(filteredData)) {
          return filteredData?.map((item: any) => ({
            ...item,
            id: item?.id,
            value: item?.id,
            code: item?.code,
            isDefault: item?.default,
            label: item?.name || item?.code || "Undefined",
          }));
        }

        return filteredData;
      }),
  });
};

const useApi = () => {
  const authApi = axios.create({
    baseURL: AppConfig.apiUrl,
    // paramsSerializer: {
    //   //Custom encoder function which sends key/value pairs in an iterative fashion.
    //   encode?: (param: string): string => { /* Do custom operations here and return transformed string */ },
    //   // Custom serializer function for the entire parameter. Allows user to mimic pre 1.x behaviour.
    //   serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ),
    //   //Configuration for formatting array indexes in the params.
    //   indexes: false // Three available options: (1) indexes: null (leads to no brackets), (2) (default) indexes: false (leads to empty brackets), (3) indexes: true (leads to brackets with indexes).
    // },
    // transformRequest: [
    //   function (data, headers) {
    //     // force json content type
    //     headers["Content-Type"] = "application/json";
    //     // stringify data replacing undefined values with null
    //     return qs.stringify(data, {
    //       serializeDate: (value: Date) => {
    //         console.log("useApi transformRequest value", value);
    //         return formatDate({ value, format: "yyyy-MM" });
    //       },
    //     });
    //   },
    // ],
  });

  authApi.defaults.headers.common["Content-Type"] = "application/json";

  // authApi.defaults.paramsSerializer = (params) => {
  //   console.log("useApi paramsSerializer params", params);
  //   return qs.stringify(params, {
  //     serializeDate: (value: Date) => {
  //       console.log("useApi paramsSerializer value", value);
  //       return formatDate({ value, format: "yyyy-MM" });
  //     },
  //   });
  // };

  authApi.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config;
      // config.paramsSerializer = (params) => {
      //   console.log("useApi interceptors params", params);
      //
      //   return qs.stringify(params, {
      //     serializeDate: (value: Date) => {
      //       console.log("useApi interceptors value", value);
      //       return formatDate({ value, format: "yyyy-MM" });
      //     },
      //   });
      // };
      //
      // console.log("useApi interceptors", config);
      // return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      showErrorToast(error);
      // document.location.href = "/login";
      return Promise.reject(error);
    },
  );

  return authApi;
};

export default useApi;

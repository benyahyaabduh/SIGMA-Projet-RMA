import { MRT_PaginationState } from "material-react-table";

import { formatDate, isDefined, isDefinedAndNotEmpty } from "utils/helper";
import { ApiProps } from "types/ApiProps";
import {
  first,
  has,
  isArray,
  isNull,
  isObject,
  isString,
  isUndefined,
  toNumber,
} from "lodash";
import { isDate } from "date-fns";
import { FilterMode } from "components/Datatable/services/modeOptions";

export const buildApiUrl = (apiProps?: ApiProps) => {
  const url: any[] = [];
  if (isDefined(apiProps?.url)) {
    url.push(apiProps?.url);
    if (isDefined(apiProps?.pathVariable)) {
      url.push(apiProps?.pathVariable);
    }
  }

  return url.join("/");
};

export const buildQueryKeys = ({
  columnFilters,
  apiProps,
  pagination,
  enablePagination = false,
}: {
  apiProps: ApiProps;
  columnFilters?: any[];
  pagination: MRT_PaginationState;
  enablePagination?: boolean;
}) => {
  const isEnabled = isDefinedAndNotEmpty(apiProps);

  const queryKeys = [];
  if (isEnabled) {
    queryKeys.push(apiProps?.url);
    if (isDefined(apiProps?.pathVariable)) {
      queryKeys.push(apiProps?.pathVariable);
    }
    queryKeys.push(
      formatApiParams({
        columnFilters,
        apiProps,
        pagination,
        enablePagination,
      }),
    );
  }

  return queryKeys;
};

export const formatApiParams = ({
  columnFilters,
  apiProps,
  pagination,
  enablePagination = false,
}: {
  apiProps: ApiProps;
  columnFilters?: any[];
  pagination: MRT_PaginationState;
  enablePagination?: boolean;
}) => {
  const paramsArray = [];
  if (isDefinedAndNotEmpty(columnFilters)) {
    const filters = columnFilters?.reduce(
      (acc, cur) => ({ ...acc, [cur?.id]: cur?.value }),
      {},
    );
    paramsArray.push(filters);
  }

  if (isDefinedAndNotEmpty(apiProps?.params)) {
    paramsArray.push(apiProps?.params);
  }

  if (isDefinedAndNotEmpty(pagination) && enablePagination) {
    paramsArray.push({
      page: toNumber(pagination?.pageIndex),
      size: toNumber(pagination?.pageSize),
    });
  }

  return paramsArray.reduce((acc, cur) => ({ ...acc, ...cur }), {});
};

export const buildQueryUrl = (props: ApiProps | undefined) => {
  const url = [];
  if (isDefined(props?.url)) {
    url.push(props?.url);
    if (isDefined(props?.pathVariable)) {
      url.push(props?.pathVariable);
    }
  }

  return url.join("/");
};

const getFilterValue: any = (data: any) => {
  if (isArray(data)) {
    return data.map((item) => getFilterValue(item));
  }

  if (isObject(data) && has(data, "id")) {
    // @ts-ignore
    return data?.id;
  }

  return data;
};

const stringifyFilter = (value: any) =>
  isDefined(value) ? (isDate(value) ? formatDate({ value }) : value) : null;

export const buildFilters = (props: ApiProps | undefined) => {
  console.log("buildFilters", { props });
  if (isUndefined(props)) {
    return [];
  }

  const { columnFilters, columnFilterFns } = props;
  return columnFilters
    ?.filter((item: any) => isDefined(item.value))
    ?.flatMap(({ id, value }: any) => {
      const filterFn = columnFilterFns[id] as any;

      const key = isObject(value) ? first(id.split(".")) : id;
      const filterValue = getFilterValue(value);
      console.log("buildFilters key", { key, filterValue });

      if (isString(filterValue)) {
        return { key, value: filterValue };
      }

      const from = isArray(filterValue)
        ? filterValue[0]
        : filterFn.startsWith(FilterMode.GreaterThan)
        ? filterValue
        : null;

      const to = isArray(filterValue)
        ? filterValue[1]
        : filterFn.startsWith(FilterMode.LessThan)
        ? filterValue
        : null;

      const is = filterFn === FilterMode.Equals ? filterValue : null;

      const filter = {
        id: stringifyFilter(is),
        is: stringifyFilter(is),
        from: stringifyFilter(from),
        to: stringifyFilter(to),
        includes: filterFn === FilterMode.IncludesSome ? filterValue : null,
        inclusive: [
          FilterMode.BetweenInclusive,
          FilterMode.LessThanOrEqualTo,
          FilterMode.GreaterThanOrEqualTo,
        ].includes(filterFn),
      };

      console.log("buildFilters filter", filter);

      return { key, value: filter };
    });
};

interface QueryParamProps {
  key: string;
  value: any;
}

export const buildQueryParams = (props: ApiProps | undefined) => {
  const {
    params,
    columnFilters,
    sorting,
    pagination,
    enableSorting = true,
  } = props || {};

  console.log("buildQueryParams params", params);

  const queryParams: QueryParamProps[] = [];

  if (isDefinedAndNotEmpty(columnFilters)) {
    const filters = buildFilters(props);
    filters?.forEach(({ key, value }: any) => {
      queryParams.push({
        key,
        value: isDate(value) ? formatDate({ value }) : value,
      });
    });
  }

  if (!isNull(params) && !isUndefined(params)) {
    Object.entries(params).forEach(([key, value]) => {
      if (isDefined(value)) {
        // queryParams.push({ key, value: `${value}` });
        queryParams.push({ key, value });
      }
    });
  }

  if (isDefinedAndNotEmpty(pagination)) {
    const pageIndex = pagination?.pageIndex;
    if (!isNull(pageIndex) && !isUndefined(pageIndex)) {
      queryParams.push({ key: "page", value: pageIndex + 1 });
    }

    const pageSize = pagination?.pageSize;
    if (!isNull(pageSize) && !isUndefined(pageSize)) {
      queryParams.push({ key: "pageSize", value: pageSize });
    }
  }

  if (enableSorting) {
    if (!isNull(sorting) && !isUndefined(sorting)) {
      sorting.forEach(({ id, desc }: any) => {
        const key = first(id.split("."));
        // queryParams.push({ key: "sortField", value: key });
        // queryParams.push({ key: "sortOrder", value: desc ? "desc" : "asc" });
      });
    } else {
      // queryParams.push({ key: "sortField", value: "id" });
      // queryParams.push({ key: "sortOrder", value: "desc" });
    }
  }

  console.log("buildQueryParams queryParams", queryParams);

  const searchParams = buildURLSearchParams(queryParams);
  const requestData = queryParams.reduce(
    (acc, cur) => ({ ...acc, [cur.key]: cur.value }),
    {},
  );

  return { queryParams: requestData, searchParams };
};

const buildURLSearchParams = (params: QueryParamProps[]) => {
  const queryParams = new URLSearchParams();
  params.forEach(({ key, value }) => {
    queryParams.append(key, String(value));
  });

  return queryParams;
};

export const buildQuery = (props: ApiProps | undefined) => {
  const isEnabled = isDefinedAndNotEmpty(props);

  const queryUrl = buildQueryUrl(props);
  const queryKeys = [];
  const { queryParams, searchParams } = buildQueryParams(props);

  if (isEnabled) {
    queryKeys.push(props?.url);
    if (isDefined(props?.pathVariable)) {
      queryKeys.push(props?.pathVariable);
    }

    // queryKeys.push(searchParams.toString());
    queryKeys.push(JSON.stringify(queryParams));
  }

  return { queryUrl, queryKeys, queryParams, searchParams };
};

export const extractQueryParams = (data: URLSearchParams) => {
  return Array.from(data.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );
};

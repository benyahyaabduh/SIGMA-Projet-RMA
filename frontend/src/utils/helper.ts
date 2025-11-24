import {
  first,
  has,
  isArray,
  isBoolean,
  isEmpty,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "lodash";
import {
  format as dateFnsFormat,
  formatISO,
  isDate,
  isValid,
  parseISO,
} from "date-fns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const isDefined = (value: any) => !isUndefined(value) && !isNull(value);

export const isNotDefined = (value: any) => isUndefined(value) || isNull(value);

export const isNotDefinedOrEmpty = (value: any) =>
  isUndefined(value) || isNull(value) || isEmpty(value);

export const isDefinedAndNotEmpty = (value: any) =>
  !isUndefined(value) && !isNull(value) && !isEmpty(value);

export const toDate = (data?: any) => {
  if (isNotDefined(data)) return null;

  if (isString(data)) return parseISO(data);

  return data;
};

export const toISODate = (value?: any) => {
  if (isNotDefined(value)) return null;

  if (isDate(value)) return formatISO(value);

  if (isString(value)) return formatISO(parseISO(value));
  return value;
};

export const formatDate = ({
  value,
  format = "yyyy-MM-dd",
}: {
  value: any;
  format?: any;
}) => {
  if (isNotDefined(value)) return null;

  if (isDate(value)) {
    if (!isValid(value)) {
      return "-";
    }
    return dateFnsFormat(value, format);
  }

  if (isString(value)) {
    return dateFnsFormat(parseISO(value), format);
  }

  return value;
};

export const toPercent = ({
  value,
  decimalDigits = 0,
  convert = true,
}: {
  value: number | undefined;
  decimalDigits?: number | undefined;
  convert?: boolean | undefined;
}) =>
  value
    ? (convert
        ? value >= 1
          ? value * 0.01
          : value
        : value / 100
      )?.toLocaleString?.("en-US", {
        minimumFractionDigits: decimalDigits,
        maximumFractionDigits: decimalDigits,
        style: "percent",
      })
    : null;

export const addRouteParam = (route: string) => route.concat("/:code");

export const showErrorToast = (error: AxiosError) => {
  const data: any = error?.response?.data;

  if (error?.response?.status === 500) {
    toast.error("An error occurred, please contact admin");
    return;
  }
  if (error?.response?.status === 401) {
    toast.error(
      "Votre session a expiré en raison d'une inactivité . Veuillez vous reconnecter.\"",
    );
    return;
  }

  // TODO to be checked
  // const detail = data?.response?.detail;
  const detail = data?.detail;
  const message = isDefinedAndNotEmpty(detail) ? detail : error.message;

  toast.error(message);
};

export const isFormattedMessage = (value: any) => isObject(value);

export const flattenErrorFields = (data: any): any => {
  if (has(data, "message") && has(data, "ref") && has(data, "type")) {
    return [data?.message];
  }

  return Object.values(data).flatMap((p) => flattenErrorFields(p));
};

export const getDirtyValues = (
  dirtyFields: Partial<Readonly<any>> | undefined,
): any => {
  const dirtyValues: any = {};

  if (dirtyFields) {
    Object.keys(dirtyFields).forEach((key) => {
      if (dirtyFields[key] instanceof Object) {
        const subDirtyValues = getDirtyValues(dirtyFields[key]);
        if (isDefinedAndNotEmpty(subDirtyValues)) {
          dirtyValues[key] = subDirtyValues;
        }
      } else if (dirtyFields[key] === true) {
        dirtyValues[key] = true;
        if (key.endsWith("_isDirty")) {
          const newKey = key.replace("_isDirty", "");
          dirtyValues[newKey] = true;
          //delete dirtyValues[key];
        }
      }
    });
  }

  return dirtyValues;
};

export const getFormUpdatedData = ({
  data,
  dirtyFields,
}: {
  data: any;
  dirtyFields: Partial<Readonly<any>> | undefined;
}) => {
  const dirtyValues = getDirtyValues(dirtyFields);
  const dirtyKeys = Object.keys(dirtyValues);

  return isDefinedAndNotEmpty(dirtyValues)
    ? Object.assign(
        {},
        ...Object.entries(data)
          .filter(([key, _]) => !key.endsWith("_isDirty"))
          .map(([key, value]) => ({
            [key]:
              dirtyKeys.includes(key) || ["id", "version"].includes(key)
                ? value
                : null,
          })),
      )
    : data;
};

export const getErrorBy = ({ name, errors }: { name: string; errors: any }) => {
  if (isDefinedAndNotEmpty(errors)) {
    const nameArray = name?.split(".");
    if (nameArray?.length === 1) {
      return errors[name];
    }
    return nameArray.reduce(
      (obj, key) => (!isNull(obj) && has(obj, key) ? obj[key] : null),
      errors,
    );
  }

  return null;
};

export const getErrorByFieldName = (fieldName: string, errors: any) => {
  return !!getErrorBy({ name: fieldName, errors });
  // if (isDefinedAndNotEmpty(errors)) {
  //   const nameArray = fieldName?.split(".");
  //   if (nameArray?.length === 1) {
  //     return !!errors[fieldName];
  //   }
  //   const result = nameArray.reduce(
  //     (obj, key) => (!isNull(obj) && has(obj, key) ? obj[key] : null),
  //     errors,
  //   );
  //   return !!result;
  // }
  // return false;
};

export const buildName = ({
  name,
  prefix,
}: {
  name: string;
  prefix?: string;
}) => (isDefinedAndNotEmpty(prefix) ? `${prefix}.${name}` : name);

export const formatCreatedAudit = ({
  createdBy,
  createdAt,
}: {
  createdBy?: string;
  createdAt?: any;
}) => {
  const data = [];
  if (isDefined(createdBy)) {
    data.push(`Par ${createdBy}`);
  }

  if (isDefined(createdAt)) {
    data.push(
      `le ${formatDate({ value: createdAt, format: "dd/MM/yyyy HH:mm:ss" })}`,
    );
  }

  return data.join(" ");
};

export const formatUpdatedAudit = ({
  updatedBy,
  updatedAt,
}: {
  updatedBy?: string;
  updatedAt?: any;
}) => {
  const data = [];
  if (isDefined(updatedBy)) {
    data.push(`Par ${updatedBy}`);
  }

  if (isDefined(updatedAt)) {
    data.push(
      `le ${formatDate({ value: updatedAt, format: "dd/MM/yyyy HH:mm:ss" })}`,
    );
  }

  return data.join(" ");
};

export const isMultipleSelect = (mode: any) =>
  isNotDefined(mode) || "equals" !== mode?.code;

export const formatFilterText = ({ data, optionLabel = "code" }: any) => {
  // console.log("formatFilterText data", data, optionLabel);
  if (isNotDefined(data)) {
    return null;
  }

  if (isNumber(data)) {
    return data.toLocaleString?.("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  if (isString(data)) {
    return data;
  }

  if (isDate(data)) {
    return formatDate({ value: data });
  }

  if (isArray(data)) {
    const items: any[] = data.map((item) =>
      formatFilterText({ data: item, optionLabel }),
    );
    return items.length > 2
      ? `${first(items)} (+${items.length - 1})`
      : items.join(" and ");
  }

  if (isObject(data)) {
    // @ts-ignore
    return data[optionLabel];
  }

  if (isBoolean(data)) {
    return `${data}`;
  }

  return data;
};

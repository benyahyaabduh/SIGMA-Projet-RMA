import { Box, Typography } from "@mui/material";
import { isDate } from "date-fns";
import { has, isNumber, isObject, isString } from "lodash";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { isDefinedAndNotEmpty, isNotDefined, formatDate } from "utils/helper";

interface RenderTextProps {
  value: any;
  format?: any;
  display?: string;
}

const RenderText = ({
  value,
  format,
  display = "libelle",
}: RenderTextProps) => {
  if (isNotDefined(value)) {
    return <Box />;
  }

  if (isDefinedAndNotEmpty(format)) {
    return (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        value={format?.notConverted ? value / 100 : value}
        {...format}
      />
    );
  }

  if (isNumber(value))
    return <Typography component={"span"}>{value}</Typography>;

  //if (isString(value)) return <Typography component={'span'}>{value}</Typography>;
  if (isString(value)) return value;

  if (isDate(value)) {
    return formatDate({ value, format: "dd/MM/yyyy" });
  }

  if (isObject(value) && has(value, "defaultMessage")) {
    return <FormattedMessage {...value} />;
  }

  if (isObject(value) && has(value, display)) {
    // @ts-ignore
    return value[display];
  }

  if (isObject(value) && has(value, "name")) {
    // @ts-ignore
    return value.name;
  }

  return <Box />;
};

export default RenderText;

import { Box } from "@mui/material";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import { isDefined, isNotDefined } from "utils/helper";

interface PriceCellFormatProps {
  cell: any;
  applyCent?: boolean;
  styled?: boolean;
}

interface PriceFormatProps {
  data: any;
  currency: any;
  applyCent?: boolean;
  styled?: boolean;
}

export const PriceFormat: FC<PriceFormatProps> = ({
  data,
  currency,
  styled = false,
}) => {
  const intl = useIntl();
  if (isNotDefined(data)) {
    return <>-</>;
  }

  const displayedSymbol = isDefined(currency?.code) ? ` ${currency?.code}` : "";

  return (
    <Box sx={styled ? { color: data < 0 ? "red" : "blue" } : {}}>
      {`${intl.formatNumber(data, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        // fixedDecimalScale: true,
      })}${displayedSymbol}`}
    </Box>
  );
};

const PriceCellFormat: FC<PriceCellFormatProps> = ({
  cell,
  applyCent = false,
  styled = false,
}) => (
  <PriceFormat
    data={cell?.getValue()}
    currency={cell?.row?.original?.currency}
    applyCent={applyCent}
    styled={styled}
  />
);

export default PriceCellFormat;

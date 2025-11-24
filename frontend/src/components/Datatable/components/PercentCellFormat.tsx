import React, { FC } from "react";
import { toPercent } from "utils/helper";

interface NumberCellFormatProps {
  cell: any;
  decimalDigits?: number;
  convert: false;
}

const PercentCellFormat: FC<NumberCellFormatProps> = ({
  cell,
  decimalDigits = 0,
  convert,
}) => {
  const data = cell.getValue();
  return (
    <>
      {toPercent({
        value: data,
        decimalDigits,
        convert,
      })}
    </>
  );
};

export default PercentCellFormat;

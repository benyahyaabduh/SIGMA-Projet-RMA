import React, { FC } from "react";
import { formatDate } from "utils/helper";

interface DateCellFormatProps {
  cell: any;
  format?: string;
}

const DateCellFormat: FC<DateCellFormatProps> = ({
  cell,
  format = "dd/MM/yyyy",
}) => <>{formatDate({ value: cell.getValue(), format })}</>;

export default DateCellFormat;

import React, { FC } from 'react';

interface NumberCellFormatProps {
    cell: any;
    decimalDigits?: number;
    signDisplay?: string;
}

const NumberCellFormat: FC<NumberCellFormatProps> = ({
    cell,
    decimalDigits = 0,
    signDisplay = 'auto'
}) => (
    <>
        {cell.getValue()?.toLocaleString?.('en-US', {
            minimumFractionDigits: decimalDigits,
            maximumFractionDigits: decimalDigits,
            signDisplay: signDisplay
        })}
    </>
);

export default NumberCellFormat;

import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { isDefined } from "utils/helper";

interface CustomProps {
  onChange: (event: {
    target: { name: string; value: number | undefined | null };
  }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props?.name,
              value: isDefined(values?.floatValue) ? values?.floatValue : null,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        allowNegative={false}
        {...other}
      />
    );
  },
);

export default NumericFormatCustom;

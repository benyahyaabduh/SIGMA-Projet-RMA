import React, { FC, forwardRef } from "react";
import { isUndefined } from "lodash";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { isDefined } from "utils/helper";
import FormInput from "components/forms/FormInput";

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

interface FormNumberFieldProps {
  label: any;
  className?: any;
  InputProps?: any;
  name: string;
  [x: string]: any;
}

export const FormPercentField: FC<FormNumberFieldProps> = ({
  label,
  name,
  InputProps,
  ...rest
}) => (
  <FormNumberField
    label={label}
    name={name}
    inputProps={{
      suffix: "%",
      //decimalScale: 0, //TODO
      fixedDecimalScale: false,
      isAllowed: (data: any) => {
        const { floatValue } = data;
        const isAllowed =
          isUndefined(floatValue) ||
          (floatValue >= 0 &&
            (rest.maxValue >= 0
              ? floatValue <= rest.maxValue
              : floatValue <= 100));

        const isAllowedFn = InputProps?.isAllowed;
        if (typeof isAllowedFn === "function") {
          return isAllowed && isAllowedFn(data);
        }

        return isAllowed;
      },
      ...InputProps,
    }}
    {...rest}
  />
);

const FormNumberField: FC<FormNumberFieldProps> = ({
  label,
  name,
  className,
  placeHolder,
  InputProps,
  ...rest
}) => (
  <FormInput
    label={label}
    name={name}
    className={className}
    placeholder={placeHolder}
    InputProps={{
      inputComponent: NumericFormatCustom as any,
      ...InputProps,
    }}
    {...rest}
  />
);

export default FormNumberField;

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Box, Grid, Stack } from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { ObjectSchema, ValidationError } from "yup";

import {
  flattenErrorFields,
  getDirtyValues,
  isDefined,
  isNotDefinedOrEmpty,
} from "utils/helper";

import { ResetType } from "components/forms/Form/ResetType";
import { FormSubmitProps } from "types";

interface FormProps {
  id?: string;
  onSubmit: (data: FormSubmitProps) => Promise<any>;
  validator: ObjectSchema<any>;
  defaultValues: any;
  isDraggable?: boolean;
  validateManually?: boolean;
  resetType?: ResetType;
  containerProps?: any;
  stackProps?: any;
}

const Form = ({
  id = "default-from",
  onSubmit,
  validator,
  defaultValues,
  validateManually = false,
  containerProps,
  stackProps,
  children,
}: PropsWithChildren<FormProps>) => {
  const [canReset, setCanReset] = useState(false);

  const methods = useForm<any>({
    defaultValues,
    ...(!validateManually && {
      resolver: yupResolver(validator),
    }),
  });

  const { reset, formState } = methods;

  const onValidate = ({ data, event, onValid }: any) => {
    const dirtyFields = formState?.dirtyFields;
    const dirtyValues = getDirtyValues(dirtyFields);
    const dirtyKeys = Object.keys(dirtyValues);

    if (isNotDefinedOrEmpty(dirtyValues)) {
      const message = "Aucune donnée modifiée";
      toast.warning(message);
      return new Promise((resolve) => resolve(message));
    }

    const updatedData = Object.assign(
      {},
      ...Object.entries(data)
        .filter(([key, _]) => !key.endsWith("_isDirty"))
        .map(([key, value]) => ({
          [key]:
            dirtyKeys.includes(key) || ["id", "version"].includes(key)
              ? value
              : null,
        })),
    );

    return validator
      .validate(updatedData, { abortEarly: false, stripUnknown: false })
      .then(function (validatedData) {
        return onValid({ validatedData, event });
      })
      .catch((err: ValidationError) => {
        console.error("Form:: onValidate errors", err.name, err.errors);
        setCanReset(false);
        err.errors.forEach((error: string) => {
          toast.error(error);
        });
      });
  };

  const onSubmitValidData = ({ validatedData, event }: any) => {
    const buttonId = event.nativeEvent.submitter.id;

    return onSubmit({
      data: validatedData,
      options: { submitter: buttonId },
      formState: methods.formState,
      event,
    })
      .then((response: any) => {
        setCanReset(true);
        return response;
      })
      .catch((e: any) => {
        console.error("Form: onSubmit exception", e);
        setCanReset(false);
      });
  };

  const onSubmitHandler: SubmitHandler<any> = (data, event: any) => {
    if (validateManually) {
      return onValidate({
        data,
        event,
        onValid: onSubmitValidData,
      });
    }

    return onSubmitValidData({ validatedData: data, event });
  };

  const onErrorHandler: SubmitErrorHandler<any> = (errors, _e) => {
    console.error("Form: onErrorHandler errors", errors);
    const fields = flattenErrorFields(errors);
    fields.forEach((field: string) => {
      toast.error(field);
    });
  };

  const { isDirty, isSubmitSuccessful, isSubmitted } = formState;

  useEffect(() => {
    if (isDirty && isSubmitSuccessful && isSubmitted && canReset) {
      reset(defaultValues);
    }
  }, [
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    reset,
    defaultValues,
    canReset,
  ]);

  return (
    <FormProvider {...methods}>
      <Box
        id={id}
        component="form"
        onSubmit={methods.handleSubmit(onSubmitHandler, onErrorHandler)}
      >
        {/*{children}*/}
        {isDefined(containerProps) ? (
          <Grid container spacing={2} {...containerProps}>
            {children}
          </Grid>
        ) : isDefined(stackProps) ? (
          <Stack spacing={2} {...stackProps}>
            {children}
          </Stack>
        ) : (
          children
        )}
      </Box>
    </FormProvider>
  );
};

export default Form;

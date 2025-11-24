import React from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Box, PaperProps } from "@mui/material";
import Draggable from "react-draggable";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "react-toastify";
import { ObjectSchema } from "yup";

interface DialogPaperFormProps extends PaperProps {
  methods?: UseFormReturn<any>;
  onClose: () => void;
  onSubmit: any;
  defaultValues: any;
  schema: ObjectSchema<any>;
  onErrorHandler?: SubmitErrorHandler<any>;
  onSubmitHandler?: SubmitHandler<any>;
}

const DialogPaperForm = (props: DialogPaperFormProps) => {
  const { children, defaultValues, onSubmit, schema, ...rest } = props;
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<any> = (data, _e: any) => {
    return onSubmit(data); // TODO to be completed like Form
  };

  const onErrorHandler: SubmitErrorHandler<any> = (errors, e) => {
    console.error("DialogPaperForm onErrorHandler", errors, e);
    Object.entries(errors).forEach(([_key, item]) => {
      toast.error(`${item?.message}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <Draggable
        handle="#draggable-dialog-from-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Box
          {...rest}
          sx={{
            borderRadius: "16px",
            padding: "12px",
            bgcolor: "rgba(242, 244, 250, 0.1)",
          }}
          component="form"
          onSubmit={methods.handleSubmit(onSubmitHandler, onErrorHandler)}
        >
          {children}
        </Box>
      </Draggable>
    </FormProvider>
  );
};

export default DialogPaperForm;

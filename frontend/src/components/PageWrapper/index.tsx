import React, { FC, ReactNode } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { FetchStatus } from "@tanstack/react-query";
import { isDefined } from "utils/helper";
import {
  Condition,
  PageError,
  PageFooter,
  PageLoader,
  PageTitle,
} from "components";

interface PageWrapperProps {
  title: string | object;
  actions?: any;
  children?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  fetchStatus?: FetchStatus;
  stackProps?: any;
  containerProps?: any;
}

const PageWrapper: FC<PageWrapperProps> = ({
  title,
  actions,
  children,
  footer,
  isLoading = false,
  isError = false,
  isSuccess = true,
  fetchStatus,
  stackProps,
  containerProps,
}) => {
  const hasFooter = isDefined(footer);

  return (
    <Stack spacing={2} sx={hasFooter ? { pb: 8 } : {}}>
      <Condition isValid={isError}>
        <PageError />
      </Condition>
      <Condition isValid={isLoading}>
        <PageLoader />
      </Condition>
      <Condition isValid={isSuccess || fetchStatus === "idle"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <PageTitle title={title} />
          {actions}
        </Stack>
        {/*<Box>{children}</Box>*/}
        <Box>
          {isDefined(containerProps) ? (
            <Grid
              container
              spacing={2}
              alignItems="center"
              alignContent="center"
              {...containerProps}
            >
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
        {hasFooter ? <PageFooter>{footer}</PageFooter> : undefined}
      </Condition>
    </Stack>
  );
};

export default PageWrapper;

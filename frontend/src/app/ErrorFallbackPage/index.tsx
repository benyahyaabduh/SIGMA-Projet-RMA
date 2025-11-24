import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardWrapper, RenderText } from "components";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import messages from "config/i18n/messages";
import { RoutePath } from "config/routes/path";

const ErrorFallbackPage = ({ error, resetErrorBoundary }: any) => {
  const navigate = useNavigate();

  return (
    <CardWrapper cardProps={{ sx: { p: 5, m: 3 } }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <ReportProblemOutlinedIcon
            sx={{ fontSize: 90, color: "secondary.main" }}
          />
        </Box>
        <Stack spacing={1}>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold", color: "secondary.main" }}
          >
            <RenderText value={messages.errorMessage} />
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
            <RenderText value={error.message} />
          </Typography>
          <Box sx={{ maxWidth: 400 }}>
            <Stack direction="row" spacing={2}>
              <Button
                label={messages.refresh}
                onClick={() => navigate(RoutePath.DASHBOARD)}
                sx={{ bgcolor: "secondary.main" }}
              />
              <Button label={messages.tryAgain} onClick={resetErrorBoundary} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </CardWrapper>
  );
};

export default ErrorFallbackPage;

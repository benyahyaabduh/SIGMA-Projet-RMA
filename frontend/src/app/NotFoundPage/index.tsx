import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { RenderText } from "components";
import messages from "config/i18n/messages";

const NotFoundPage = () => {
  return (
    <Box
      overflow="auto"
      flexDirection="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", pt: 10 }}
    >
      <Card elevation={0}>
        <CardContent>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: 600 }}
          >
            <Typography sx={{ fontSize: 120, fontWeight: "bold" }}>
              404
            </Typography>
            <Stack spacing={1}>
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                <RenderText value={messages.somethingWentWrong} />
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                <RenderText value={messages.notFoundPage} />
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFoundPage;

import { FC } from "react";
import { Article as ArticleIcon } from "@mui/icons-material";
import { Stack, styled, Box } from "@mui/material";
import { RenderText } from "components";

const StyledTypography = styled(Box)({
  color: "#1d2442",
  fontSize: "23px",
  fontWeight: 500,
});

interface PageTitleProps {
  title: string | object;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <Stack spacing={1} direction="row" alignItems="center">
    <ArticleIcon sx={{ fontSize: 23, color: "#1d2442" }} />
    <StyledTypography>
      <RenderText value={title} />
    </StyledTypography>
  </Stack>
);

export default PageTitle;

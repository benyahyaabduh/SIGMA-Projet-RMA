import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconButton, RenderText } from "components";
import messages from "config/i18n/messages";
import { Add as AddIcon } from "@mui/icons-material";
import { isDefined, isNotDefined } from "utils/helper";

const FilterByHeader = ({ column, pinned, onChange, onAdd }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${
          theme.palette.mode === "light" ? "#eaecef" : "#30363d"
        }`,
        fontWeight: 600,
        p: 2,
        pb: 1,
        pt: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            <RenderText value={messages.filterBy} />
          </Typography>
          {/*<Typography sx={{ fontWeight: "bold" }}>*/}
          {/*  <RenderText value={messages.filterBy} />*/}
          {/*</Typography>*/}
          {/*<Typography>*/}
          {/*  <RenderText value={columnDef.header} />*/}
          {/*</Typography>*/}
        </Stack>
        {/*<Switcher checked={pinned} rightLabel={"Pinned"} onChange={onChange} />*/}
        {isDefined(onAdd) && (
          <IconButton squared icon={AddIcon} onClick={onAdd} />
        )}
      </Stack>
    </Box>
  );
};

export default FilterByHeader;

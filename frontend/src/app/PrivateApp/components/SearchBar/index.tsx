import { Search as SearchIcon } from "@mui/icons-material";
import { alpha, Divider, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { isNotDefined } from "utils/helper";
import { RoutePath } from "config/routes/path";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState<string | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [typeRecherche] = useState<any>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSearch = () => {
    if (location.pathname !== RoutePath.SEARCH_RESULTS) {
      navigate(RoutePath.SEARCH_RESULTS);
    }
  };

  const isSearchDisabled =
    isNotDefined(typeRecherche) ||
    isNotDefined(value) ||
    (value !== null && value.length < 3);

  return (
    <Paper
      elevation={0}
      component="form"
      // onSubmit={methods.handleSubmit(onSubmitHandler)}
      sx={{
        p: "5px 8px",
        display: "flex",
        alignItems: "center",
        bgcolor: alpha("#2f68e3", 0.1),
        borderRadius: 10,
      }}
    >
      {/* <SearchType onChange={setTypeRecherche} /> */}
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Recherche..."
        inputProps={{ "aria-label": "search google maps" }}
        onChange={onChangeHandler}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {isSearchDisabled ? <Tooltip id="search-button-tooltip" /> : undefined}
      <IconButton
        data-tooltip-id="search-button-tooltip"
        data-tooltip-content="Les champs sont obligatoire!"
        type="button"
        // sx={{ p: "10px" }}
        sx={{
          bgcolor: alpha("#2f68e3", 0.5),
          // m: 0.5
        }}
        aria-label="search"
        // size="small"
        onClick={onSearch}
        disabled={isSearchDisabled}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  Clear as ClearIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { last } from "lodash";
import { formatFilterText, isDefined, isNotDefined } from "utils/helper";
import { RenderText } from "components";
import { FilterMode } from "components/Datatable/services/modeOptions";

const StyledListItem = styled((props) => (
  <ListItem
    {...props}
    // size="small"
    // variant="contained"
  />
))(({ theme }) => ({
  fontSize: 12,
  textTransform: "none",
  borderRadius: "5px",
  backgroundColor: "#6573ac", // "#3a4b95", // theme.palette.secondary.main,
  color: "#ffffff",
  // ...(empty && {
  //   backgroundColor: "#d3d7e7",
  //   color: "#3a4b95",
  // }),
}));

const FilterByButton = forwardRef(
  (
    {
      column,
      value,
      mode,
      onClick,
      onDelete,
      disabled = false,
      enableExpandIcon = true,
      anchorEl,
    }: any,
    ref: any,
  ) => {
    // console.log("FilterByButton value", value);
    const { columnDef } = column;

    const { header } = columnDef;
    const open = Boolean(anchorEl);

    const keys = columnDef.accessorKey.split(".");
    const optionLabel = keys.length > 1 ? last(keys) : "code";
    // const hasData = isDefined(value);
    //|| [FilterMode.Empty, FilterMode.NotEmpty].includes(mode?.code);

    return (
      <Box>
        <StyledListItem
          // key={value}
          disablePadding
          disabled={disabled}
          empty={isNotDefined(value)}
          {...(enableExpandIcon && {
            secondaryAction: (
              <IconButton
                edge="end"
                aria-label="comments"
                // onClick={onClickHandler}
                disabled={disabled}
                sx={{ color: "inherit" }}
                size="small"
                disableRipple
                disableFocusRipple
                disableTouchRipple
              >
                {open ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            ),
          })}
          {...(typeof onDelete === "function" && {
            secondaryAction: (
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => onDelete(columnDef.accessorKey)}
                disabled={disabled}
                sx={{ color: "inherit" }}
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          })}
        >
          <ListItemButton
            ref={ref}
            // role={undefined}
            onClick={onClick}
            disabled={disabled}
            dense
            sx={{ padding: "2px 10px" }}
          >
            <ListItemText
              id={`checkbox-list-label-${value}`}
              primary={
                <React.Fragment>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      <RenderText value={header} />
                    </Typography>
                    {isDefined(value) &&
                      ([FilterMode.Empty, FilterMode.NotEmpty].includes(
                        mode?.code,
                      ) ? (
                        <Chip
                          label={`${mode?.symbol} ${mode?.label}`}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "inherit",
                            fontWeight: "bold",
                          }}
                        />
                      ) : (
                        <>
                          <Chip
                            label={mode?.symbol}
                            variant="outlined"
                            size="small"
                            sx={{
                              maxHeight: 14,
                              color: "inherit",
                              fontWeight: "bold",
                            }}
                          />
                          <Typography>
                            <RenderText
                              value={formatFilterText({
                                data: value,
                                optionLabel,
                              })}
                            />
                          </Typography>
                        </>
                      ))}
                  </Stack>
                </React.Fragment>
              }
            />
          </ListItemButton>
        </StyledListItem>
      </Box>
    );
  },
);

export default FilterByButton;

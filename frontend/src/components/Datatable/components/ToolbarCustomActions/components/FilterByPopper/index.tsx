import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Alert, Container } from "@mui/material";
import FilterPopper from "components/Datatable/components/ToolbarCustomActions/components/FilterPopper";
import FilterByHeader from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper/components/FilterByHeader";
import { Condition, RenderText } from "components";
import { isDefined } from "utils/helper";
import { FilterMode } from "components/Datatable/services/modeOptions";
import FilterByFooter from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper/components/FilterByFooter";
import FilterByContent from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper/components/FilterByContent";
import FilterByMode from "components/Datatable/components/ToolbarCustomActions/components/FilterByMode";

const FilterByPopper = ({
  column,
  value,
  mode,
  anchorEl,
  isLoading,
  isError = false,
  options,
  pinned,
  onChangeMode,
  onChangeValue,
  onCloseHandler,
  onApplyHandler,
  onChangePinned,
}: any) => {
  // console.log("FilterByPopper column", column);
  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    <FilterPopper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
    >
      <ClickAwayListener onClickAway={onCloseHandler}>
        <div>
          {isDefined(column.columnDef?.filter) ? (
            <Container component={column.columnDef?.filter} column={column} />
          ) : (
            <>
              <FilterByHeader
                column={column}
                pinned={pinned}
                onChange={onChangePinned}
              />
              <FilterByMode
                value={mode}
                onChange={onChangeMode}
                onChangeValue={onChangeValue}
                column={column}
                disabled={false}
              />
              <Condition isValid={isDefined(mode)}>
                {![FilterMode.Empty, FilterMode.NotEmpty].includes(
                  mode?.code,
                ) && (
                  <FilterByContent
                    mode={mode}
                    column={column}
                    value={value}
                    onChangeValue={onChangeValue}
                    isLoading={isLoading}
                    options={options}
                  />
                )}
                {isError && (
                  <Alert
                    severity="error"
                    sx={{ fontSize: 12, pt: 0, pb: 0 }}
                    // size="small"
                  >
                    <RenderText value={"Invalid data"} />
                  </Alert>
                )}
                <FilterByFooter
                  column={column}
                  onCancel={onCloseHandler}
                  onApply={onApplyHandler}
                />
              </Condition>
            </>
          )}
          {/*<FilterByMode*/}
          {/*  value={mode}*/}
          {/*  onChange={onChangeMode}*/}
          {/*  onChangeValue={onChangeValue}*/}
          {/*  column={column}*/}
          {/*  disabled={false}*/}
          {/*/>*/}
          {/*<Condition isValid={isDefined(mode)}>*/}
          {/*  {![FilterMode.Empty, FilterMode.NotEmpty].includes(mode?.code) && (*/}
          {/*    <FilterByContent*/}
          {/*      mode={mode}*/}
          {/*      column={column}*/}
          {/*      value={value}*/}
          {/*      onChangeValue={onChangeValue}*/}
          {/*      isLoading={isLoading}*/}
          {/*      options={options}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  {isError && (*/}
          {/*    <Alert*/}
          {/*      severity="error"*/}
          {/*      sx={{ fontSize: 12, pt: 0, pb: 0 }}*/}
          {/*      // size="small"*/}
          {/*    >*/}
          {/*      <RenderText value={"Invalid data"} />*/}
          {/*    </Alert>*/}
          {/*  )}*/}
          {/*  <FilterByFooter*/}
          {/*    column={column}*/}
          {/*    onCancel={onCloseHandler}*/}
          {/*    onApply={onApplyHandler}*/}
          {/*    onChange={onChangeValue}*/}
          {/*  />*/}
          {/*</Condition>*/}
        </div>
      </ClickAwayListener>
    </FilterPopper>
  );
};

export default FilterByPopper;

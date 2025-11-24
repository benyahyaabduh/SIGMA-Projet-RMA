import React from "react";
import { ListItemButton, ListItemText, Stack, styled } from "@mui/material";
import { isEmpty } from "lodash";
import { isDefined } from "utils/helper";
import { Condition, RenderText } from "components";
import { AntSwitch } from "components/Button/Switch";

const StyledListItemButton = styled((props: any) => (
  <ListItemButton disableRipple disableTouchRipple disableGutters {...props} />
))(({ theme }) => ({
  //height: "38px",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent !important",
  },
}));

const SwitcherTextButton = ({
  label,
  onClick,
  disabled = false,
  textAlign = "left",
  textProps = {},
}: any) => {
  return (
    <StyledListItemButton disabled={disabled} onClick={onClick}>
      <ListItemText
        primary={<RenderText value={label} />}
        primaryTypographyProps={{
          sx: {
            color: "text.viewFieldValue",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1.36,
            textAlign,
            ...textProps,
          },
        }}
      />
    </StyledListItemButton>
  );
};

const Switcher = ({
  isChecked = true,
  leftLabel,
  rightLabel,
  disabled = false,
  textProps,
  onChange,
}: any) => {
  const [checked, setChecked] = React.useState(isChecked);

  const handleChange = (value: any) => {
    setChecked(value);
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  const onRightClick = () => {
    if (isDefined(leftLabel)) {
      handleChange(true);
    } else {
      handleChange(!checked);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      //justifyContent="center"
      alignItems="center"
    >
      <Condition isValid={!isEmpty(leftLabel)}>
        <SwitcherTextButton
          label={leftLabel}
          onClick={() => handleChange(false)}
          disabled={disabled}
          textAlign={"right"}
          textProps={textProps}
        />
      </Condition>
      <AntSwitch
        checked={checked}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.checked)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Condition isValid={!isEmpty(rightLabel)}>
        <SwitcherTextButton
          label={rightLabel}
          //onClick={() => handleChange(true)}
          onClick={onRightClick}
          disabled={disabled}
          textProps={textProps}
        />
      </Condition>
    </Stack>
  );
};

export default Switcher;

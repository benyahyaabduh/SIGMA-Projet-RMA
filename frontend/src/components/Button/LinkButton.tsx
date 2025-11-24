import React from "react";
import { Link } from "@mui/material";
import { RenderText } from "components";

interface LinkButtonProps {
  label: string | object;
  onClick?: () => void;
}

const LinkButton = ({ label, onClick }: LinkButtonProps) => {
  return (
    <Link
      component="button"
      onClick={onClick}
      sx={{
        padding: "8px 24px",
        borderRadius: "100px",
        textTransform: "none",
        color: "text.cancelButtonBg",
        fontSize: 13,
        letterSpacing: "1.25px",
        lineHeight: "1.23",
      }}
    >
      <RenderText value={label} />
    </Link>
  );
};

export default LinkButton;

import React from "react";
import { RenderText } from "components";

interface RenderHeaderProps {
  label: string | object;
}

const RenderHeader = ({ label }: RenderHeaderProps) => {
  return <RenderText value={label} />;
};

export default RenderHeader;

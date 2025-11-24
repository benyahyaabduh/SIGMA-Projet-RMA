import React, { FC } from "react";
import { PageError, PageLoader, PageNotFound } from "components";

interface RenderOnStatusProps {
  status: string;
  children: any;
}

const PageRenderer: FC<RenderOnStatusProps> = ({ status, children }) => {
  switch (status) {
    case "idle":
      return children;
    case "pending":
      return <PageLoader />;
    case "error":
      return <PageError />;
    case "success":
      return children;
    default:
      return <PageNotFound />;
  }
};

export default PageRenderer;

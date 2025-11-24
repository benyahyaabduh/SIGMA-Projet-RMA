import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import { useLocation, useParams } from "react-router-dom";

import { scope } from "config/i18n/messages";
import { PAGE_TITLE_HOME } from "utils/constants";
import { isDefined } from "utils/helper";

const NavigationLink = () => {
  const params = useParams();
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter((p) => !isEmpty(p))
    .filter((p) => {
      if (isDefined(params?.code)) {
        return p !== params?.code;
      }
      return true;
    });

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const breadcrumbs = paths.reduce<any>(
    (acc, cur) => [
      ...acc,
      [
        <Link
          underline="hover"
          key={acc.length + 1}
          color="inherit"
          href="/"
          onClick={handleClick}
        >
          <FormattedMessage id={`${scope}.${cur}`} />
        </Link>,
      ],
    ],
    [
      <Link
        underline="hover"
        key="1"
        color="inherit"
        href="/"
        onClick={handleClick}
      >
        {PAGE_TITLE_HOME}
      </Link>,
    ],
  );

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default NavigationLink;

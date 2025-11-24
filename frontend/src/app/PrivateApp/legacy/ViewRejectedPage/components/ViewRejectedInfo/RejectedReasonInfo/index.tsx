import React from "react";
import messages from "config/i18n/messages";
import { ErrorOutlineOutlined as ErrorOutlineOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";
import { upperCase } from "lodash";
import { buildTierFullName } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { useIntl } from "react-intl";
import ViewRejectedAction from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedAction";

const RejectedReasonInfo = ({ data }: { data: any }) => {
  const intl = useIntl();
  return (
    <CardWrapper
      stackProps={{ spacing: 4 }}
      // title={messages.rejectInfo }
      title={`${intl.formatMessage(messages.rejectInfo)} ${data?.rejectCode}`}
      icon={ErrorOutlineOutlinedIcon}
    >
      <ViewField
        direction="column"
        label={messages.rejectReason}
        value={data?.rejectReason}
        multiline
        // hasBorder={false}
      />
      <ViewRejectedAction data={data} />
    </CardWrapper>
  );
};

export default RejectedReasonInfo;

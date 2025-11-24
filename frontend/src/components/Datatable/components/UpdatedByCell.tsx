import { FC } from "react";
import { formatUpdatedAudit } from "utils/helper";

const UpdatedByCell: FC = ({ cell }: any) => {
  return <>{formatUpdatedAudit(cell.row.original)}</>;
};

export default UpdatedByCell;

import { FC } from "react";
import { formatCreatedAudit } from "utils/helper";

const CreatedByCell: FC = ({ cell }: any) => {
  return <>{formatCreatedAudit(cell.row.original)}</>;
};

export default CreatedByCell;

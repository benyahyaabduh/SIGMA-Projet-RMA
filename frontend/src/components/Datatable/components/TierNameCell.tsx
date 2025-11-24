import { FC } from "react";

const TierNameCell: FC = ({ cell }: any) => {
  const { natureClient, nom, prenom, raisonSociale } = cell.row.original;
  return natureClient?.code === "M" ? raisonSociale : `${prenom} ${nom}`;
};

export default TierNameCell;

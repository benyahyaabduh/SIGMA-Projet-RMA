import { formatDate } from "utils/helper";
import { scope } from "config/i18n/messages";

export const formatTierToApi = (data: any) => {
  const { init, info, additional, identifications, polices, ...rest } = data;
  return {
    ...init,
    ...info,
    ...additional,
    ...rest,
    dateNaissance: formatDate({ value: info.dateNaissance }),
    dateCreationLegale: formatDate({ value: info.dateCreationLegale }),
    dateDebutActivite: formatDate({ value: info.dateDebutActivite }),
    dateFinActivite: formatDate({ value: info.dateFinActivite }),
    identifications: identifications?.map((item: any) => ({
      ...item,
      dateDelivrance: formatDate({ value: item.dateDelivrance }),
      dateExpiration: formatDate({ value: item.dateExpiration }),
    })),
    polices: polices?.map((item: any) => ({
      ...item,
      dateEcheance: formatDate({ value: item.dateEcheance }),
      dateEffet: formatDate({ value: item.dateEffet }),
      initialDate: formatDate({ value: item.initialDate }),
      dateExpiration: formatDate({ value: item.dateExpiration }),
      dateEtat: formatDate({ value: item.dateEtat }),
    })),

    //dateEcheance
  };
};

export const formatTierFromApi = (data: any) => {
  console.log("formatTierFromApi data", data);
  const {
    id,
    version,
    typeTier,
    typeClient,
    natureClient,
    etatClient,
    intermediaire,
    adresses,
    moyenContacts,
    identifications,
    polices,
    ...info
  } = data;

  return {
    id,
    version,
    init: { typeTier, typeClient, natureClient, etatClient, intermediaire },
    info,
    additional: { adresses, moyenContacts },
    identifications,
    polices,
  };
};

export const buildTierFullName = (props: any) => {
  const { natureClient, nom, prenom, raisonSociale } = props || {};
  return natureClient?.code === "M" ? raisonSociale : `${prenom} ${nom}`;
};

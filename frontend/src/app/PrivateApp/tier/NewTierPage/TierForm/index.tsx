import React from "react";
import { Stack } from "@mui/material";
import * as Yup from "yup";
import messages from "config/i18n/messages";
import useTierService from "app/PrivateApp/tier/NewTierPage/TierForm/services/useTierService";
import { Form } from "components/forms";
import Stepper from "components/Stepper";
import AdministrativeDataForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdministrativeDataForm";
import AdditionalDataForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm";
import SummaryForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm";
import SupportingDocumentForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm";
import PolicyForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm";
import TierInitForm from "app/PrivateApp/tier/NewTierPage/TierForm/components/TierInitForm";
import { isDefined } from "utils/helper";

const validationSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  version: Yup.number().nullable(),
  codeClient: Yup.number().nullable(),
  init: Yup.object()
    .shape({
      typeTier: Yup.object().required(),
      typeClient: Yup.object().required(),
      natureClient: Yup.object().required(),
      etatClient: Yup.object().required(),
      intermediaire: Yup.object().required(),
    })
    .nullable(),
  info: Yup.object().when(["init.natureClient"], {
    is: (value: any) => {
      // console.log("validationSchema info value", value);
      return value?.code === "M";
    }, // alternatively: (isBig, isSpecial) => isBig && isSpecial
    then: (schema) =>
      Yup.object()
        .shape({
          raisonSociale: Yup.string().required(),
          formeJuridique: Yup.object().required(),
          capaciteJuridique: Yup.string().nullable(),
          urlSiteWeb: Yup.string().nullable(),
          sigle: Yup.string().nullable(),
          dateCreationLegale: Yup.date().required(),
          dateDebutActivite: Yup.date().required(),
          dateFinActivite: Yup.date().required(),
          capital: Yup.number().required(),
          nombreSalarie: Yup.number().nullable(),
          revenu: Yup.number().nullable(),
        })
        .nullable(),
    otherwise: (schema) =>
      Yup.object()
        .shape({
          titreCivilite: Yup.object().required(),
          prenom: Yup.string().required(),
          nom: Yup.string().required(),
          genre: Yup.object().required(),
          situationFamiliale: Yup.object().nullable(),
          dateNaissance: Yup.date().nullable(),
          lieuNaissance: Yup.string().nullable(),
          villeNaissance: Yup.object().nullable(),
          nationnalite: Yup.object().nullable(),
          profession: Yup.object().nullable(),
          nombreEnfants: Yup.number().nullable(),
          trancheSalaire: Yup.number().nullable(),
          responsable: Yup.string().nullable(),
          langue: Yup.object().nullable(),
          isVerified: Yup.boolean().nullable(),
          segments: Yup.array()
            .of(
              Yup.object().shape({
                code: Yup.string().required(),
                libelle: Yup.string().required(),
                dateDebut: Yup.date().nullable(),
                visibles: Yup.boolean().nullable(),
              }),
            )
            .nullable(),
          activities: Yup.array()
            .of(
              Yup.object().shape({
                code: Yup.string().required(),
                libelle: Yup.string().required(),
                dateDebut: Yup.date().nullable(),
                visibles: Yup.boolean().nullable(),
                secteur: Yup.object().nullable(),
              }),
            )
            .nullable(),
        })
        .nullable(),
  }),
  additional: Yup.object()
    .shape({
      adresses: Yup.array()
        .of(
          Yup.object().shape({
            typeAdresse: Yup.object().required(),
            numeroRue: Yup.string().nullable(),
            numeroImmeuble: Yup.string().nullable(),
            numeroEtage: Yup.number().nullable(),
            codePostal: Yup.number().required(),
            pays: Yup.object().required(),
            ville: Yup.object().required(),
            ligne1: Yup.string().nullable(),
            estPrincipale: Yup.boolean().required(),
          }),
        )
        .nullable(),
      moyenContacts: Yup.array()
        .of(
          Yup.object().shape({
            typeMoyenContact: Yup.object().required(),
            moyenContact: Yup.string().required(),
            estPrincipale: Yup.boolean().nullable(),
            estActif: Yup.boolean().nullable(),
          }),
        )
        .nullable(),
    })
    .nullable(),
  identifications: Yup.array()
    .of(
      Yup.object().shape({
        typeDocument: Yup.object().required(),
        valeurDocument: Yup.string().required(),
        numeroDocument: Yup.string().nullable(),
        dateDelivrance: Yup.date().required(),
        dateExpiration: Yup.date().required(),
        lieuDelivrance: Yup.object().required(),
        paysDelivrance: Yup.object().required(),
        lienGed: Yup.string().nullable(),
      }),
    )
    .nullable(),
  polices: Yup.array()
    .of(
      Yup.object().shape({
        branche: Yup.object().required(),
        etatPolice: Yup.object().required(),
        numeroPolice: Yup.number().required(),
        naturePolice: Yup.string().nullable(),
        montantTotal: Yup.number().required(),
        riskResiliation: Yup.string().nullable(),
        dateEcheance: Yup.date().nullable(),
        dateEffet: Yup.date().nullable(),
        initialDate: Yup.date().nullable(),
        dateExpiration: Yup.date().nullable(),
        dateEtat: Yup.date().nullable(),
      }),
    )
    .nullable(),
});

const defaultValues = {
  id: null,
  version: null,
  codeClient: null,
  init: {
    typeTier: null,
    typeClient: null,
    natureClient: null,
    etatClient: null,
    intermediaire: null,
  },
  info: {
    titreCivilite: null,
    prenom: null,
    nom: null,
    genre: null,
    situationFamiliale: null,
    dateNaissance: null,
    lieuNaissance: null,
    villeNaissance: null,
    nationnalite: null,
    profession: null,
    nombreEnfants: null,
    trancheSalaire: null,
    responsable: null,
    langue: null,
    isVerified: null,
    segments: [],
    activities: [],
    ////
    raisonSociale: null,
    formeJuridique: null,
    capaciteJuridique: null,
    urlSiteWeb: null,
    sigle: null,
    dateCreationLegale: null,
    dateDebutActivite: null,
    dateFinActivite: null,
    capital: null,
    nombreSalarie: null,
    revenu: null,
  },
  additional: {
    adresses: [],
    moyenContacts: [],
  },
  identifications: [],
  polices: [],
};

const TierForm = ({ data }: { data?: any }) => {
  const { onSubmit } = useTierService();

  return (
    <Stack spacing={4}>
      {/*<TreatyContractStepper />*/}
      <Form
        onSubmit={onSubmit}
        defaultValues={{ ...defaultValues, ...data }}
        validator={validationSchema}
        // resetType={resetType}
        // validateManually={true}
      >
        <Stepper
          allCompleted={isDefined(data)}
          steps={[
            {
              code: "init",
              label: messages.initialization,
              component: TierInitForm,
            },
            {
              code: "info",
              label: messages.administrativeData,
              component: AdministrativeDataForm,
            },
            {
              code: "additional",
              label: messages.addressAndContact,
              component: AdditionalDataForm,
            },
            {
              code: "identifications",
              label: messages.supportingDocument,
              component: SupportingDocumentForm,
            },
            {
              code: "polices",
              label: messages.policy,
              component: PolicyForm,
            },
            {
              code: "summary",
              label: messages.summary,
              component: SummaryForm,
            },
          ]}
        />
      </Form>
    </Stack>
  );
};

export default TierForm;

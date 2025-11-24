import React from "react";
import messages from "config/i18n/messages";
import { ContactMailOutlined as ContactMailOutlinedIcon } from "@mui/icons-material";
import { CardWrapper } from "components";
import { FormInput } from "components/forms";

const EditRejectedContacts = () => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.contacts}
      icon={ContactMailOutlinedIcon}
      collapsable
      isExpanded={false}
    >
      <FormInput
        label={messages.address}
        name="libelleAdresse"
        required
        xs={4}
      />
      <FormInput label={messages.city} name="ville" required xs={4} />
      <FormInput label={messages.country} name="pays" required xs={4} />
      <FormInput label={messages.telephone} name="telephone" required xs={4} />
      <FormInput label={messages.fax} name="fax" required xs={4} />
      <FormInput label={messages.telex} name="telex" required xs={4} />
      <FormInput label={messages.vip} name="vip" required xs={4} />
      <FormInput
        label={messages.customerContact}
        name="codeMoyenContact"
        required
        xs={4}
      />
      <FormInput label={messages.mobilePhone} name="gsm" required xs={4} />
      <FormInput label={messages.email} name="email" required xs={4} />
      <FormInput
        label={messages.licenseNumber}
        name="numPermis"
        required
        xs={4}
      />
      <FormInput
        label={messages.dateOfIssueOfPermit}
        name="dateDelivrancePermis"
        required
        xs={4}
      />
      <FormInput
        label={messages.cityIssuePermit}
        name="villeDelivrancePermis"
        required
        xs={4}
      />
      <FormInput
        label={messages.countryIssueOfPermit}
        name="paysDelivrancePermis"
        required
        xs={4}
      />
      <FormInput
        label={messages.registrationNumber}
        name="matricule"
        required
        xs={4}
      />
      <FormInput
        label={messages.addressType}
        name="typeAdresse"
        required
        xs={4}
      />
    </CardWrapper>
  );
};

export default EditRejectedContacts;

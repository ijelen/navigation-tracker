import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageInput,
  useNotify,
  useRefresh,
  useRedirect,
  required,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

import vehicleTypes from "../data/vehicleTypes";

const ImagePreview = ({ record, source }) => {
  const imageUrl = record[source].replace("image", "image_200x200");
  return (
    <div style={{ minHeight: 200, minWidth: 200, textAlign: "center" }}>
      <img alt={record.name} src={imageUrl} width="200" />
    </div>
  );
};

const VehicleCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onSuccess = ({ data }) => {
    notify(`New vehicle "${data.name}" added.`);
    redirect("/vehicles");
    refresh();
  };
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Create onSuccess={onSuccess} title="Add Vehicle" {...props}>
      <SimpleForm>
        <TextInput
          label="Name"
          source="name"
          validate={[required()]}
          fullWidth={isSmall}
        />
        <ImageInput
          source="image"
          label="Image"
          accept="image/*"
          multiple={false}
        >
          <ImagePreview source="src" />
        </ImageInput>
        <SelectInput
          label="Type"
          source="type"
          allowEmpty
          emptyText="<no type>"
          choices={vehicleTypes}
          fullWidth={isSmall}
        />
        <TextInput label="Code" source="code" fullWidth={isSmall} />
        <TextInput
          label="Registration code"
          source="registration"
          fullWidth={isSmall}
        />
        <TextInput label="Chassis" source="chassis" fullWidth={isSmall} />
        <TextInput label="Owner" source="owner" fullWidth={isSmall} />
        <DateInput
          label="Expiry date"
          source="expires"
          initialValue={new Date().toISOString().slice(0, 10)}
          fullWidth={isSmall}
        />
      </SimpleForm>
    </Create>
  );
};

export default VehicleCreate;

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
} from "react-admin";
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

  return (
    <Create onSuccess={onSuccess} title="Add Vehicle" {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" />
        <ImageInput
          source="image"
          label="Image"
          accept="image/*"
          multiple={false}
        >
          <ImagePreview source="src" />
        </ImageInput>
        <SelectInput label="Type" source="type" choices={vehicleTypes} />
        <TextInput label="Code" source="code" />
        <TextInput label="Registration code" source="registration" />
        <TextInput label="Chassis" source="chassis" />
        <TextInput label="Owner" source="owner" />
        <DateInput
          label="Expiry date"
          source="expires"
          initialValue={new Date().toISOString().slice(0, 10)}
        />
      </SimpleForm>
    </Create>
  );
};

export default VehicleCreate;

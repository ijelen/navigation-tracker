import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  useNotify,
  useRefresh,
  useRedirect,
} from "react-admin";
import vehicleTypes from "../data/vehicleTypes";

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
        <SelectInput label="Type" source="type" choices={vehicleTypes} />
        <TextInput label="Code" source="code" />
        <TextInput label="Registration code" source="registration" />
        <TextInput label="Chassis" source="chassis" />
        <TextInput label="Owner" source="owner" />
        <DateInput
          label="Expiry date"
          source="expires"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};

export default VehicleCreate;

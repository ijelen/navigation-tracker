import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
} from "react-admin";
import vehicleTypes from "../data/vehicleTypes";
import { formatRecord } from "../utils";

const ColoredDateInput = (props) => {
  return (
    <DateInput
      {...props}
      inputProps={{
        style: {
          backgroundColor: formatRecord(props.record, {
            expired: "rgba(252, 121, 132, 0.75)",
            expiring: "rgba(247, 232, 96, 0.83)",
          }),
        },
      }}
    />
  );
};
// Ensure the original component defaultProps are still applied as they may be used by its parents (such as the `Show` component)
ColoredDateInput.defaultProps = DateInput.defaultProps;
const VehicleEdit = (props) => {
  return (
    <Edit title="Edit Vehicle" {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" />
        <SelectInput label="Type" source="type" choices={vehicleTypes} />
        <TextInput label="Code" source="code" />
        <TextInput label="Registration code" source="registration" />
        <TextInput label="Chassis" source="chassis" />
        <TextInput label="Owner" source="owner" />
        <ColoredDateInput label="Expiry date" source="expires" />
      </SimpleForm>
    </Edit>
  );
};

export default VehicleEdit;

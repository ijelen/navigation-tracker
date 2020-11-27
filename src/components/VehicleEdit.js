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
    <Edit title="Uredi stroj" {...props}>
      <SimpleForm>
        <TextInput label="Naziv" source="name" />
        <SelectInput label="Tip stroja" source="type" choices={vehicleTypes} />
        <TextInput label="Oznaka" source="code" />
        <TextInput label="Registracijska oznaka" source="registration" />
        <TextInput label="Broj šasije" source="chassis" />
        <TextInput label="Vlasnik" source="owner" />
        <ColoredDateInput label="Datum isteka" source="expires" />
      </SimpleForm>
    </Edit>
  );
};

export default VehicleEdit;

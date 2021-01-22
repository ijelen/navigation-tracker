import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageInput,
} from "react-admin";
import vehicleTypes from "../data/vehicleTypes";
import { formatRecord } from "../utils";
import { useTheme } from "@material-ui/core/styles";

const ColoredDateInput = (props) => {
  const theme = useTheme();
  return (
    <DateInput
      {...props}
      inputProps={{
        style: {
          backgroundColor: formatRecord(
            props.record,
            {
              expired: theme.palette.error.main,
              expiring: theme.palette.warning.main,
            },
            theme.warnBeforeNumberOfDays
          ),
        },
      }}
    />
  );
};
// Ensure the original component defaultProps are still applied as they may be used by its parents (such as the `Show` component)
ColoredDateInput.defaultProps = DateInput.defaultProps;

const ImagePreview = ({ record, source }) => {
  const imageUrl = record[source].replace("image", "image_200x200");
  return (
    <div style={{ minHeight: 200, minWidth: 200, textAlign: "center" }}>
      <img alt={record.name} src={imageUrl} width="200" />
    </div>
  );
};

const VehicleEdit = (props) => {
  return (
    <Edit title="Edit Vehicle" {...props}>
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
        <ColoredDateInput label="Expiry date" source="expires" />
      </SimpleForm>
    </Edit>
  );
};

export default VehicleEdit;

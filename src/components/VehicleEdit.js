import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageInput,
  required,
} from "react-admin";
import vehicleTypes from "../data/vehicleTypes";
import { formatRecord } from "../utils";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

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
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Edit title="Edit Vehicle" {...props}>
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
        <ColoredDateInput
          label="Expiry date"
          source="expires"
          fullWidth={isSmall}
        />
      </SimpleForm>
    </Edit>
  );
};

export default VehicleEdit;

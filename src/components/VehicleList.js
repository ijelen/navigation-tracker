import React from "react";
import {
  List,
  useListContext,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

import { List as MuiList } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import { formatRecord, capitalizeFirstLetter } from "../utils";
import { bgColors } from "../data/settings";

const VehicleList = (props) => {
  const postRowStyle = (record, index) => {
    return {
      backgroundColor: formatRecord(record, {
        expired: bgColors.expired,
        expiring: bgColors.expiring,
      }),
    };
  };

  const MySimpleList = () => {
    const { ids, data, basePath } = useListContext();
    return (
      <MuiList>
        {ids.map((id) => (
          <ListItem
            style={{
              backgroundColor: formatRecord(data[id], {
                expired: bgColors.expired,
                expiring: bgColors.expiring,
              }),
            }}
            key={id}
            button
            component="a"
            href={`#${basePath}/${id}`}
          >
            <ListItemText
              primary={
                <Grid container justify="space-between">
                  <Grid item>
                    {capitalizeFirstLetter(data[id].type)} {data[id].name}
                  </Grid>
                  <Grid item>
                    <DateField
                      record={data[id]}
                      source="expires"
                      options={{
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }}
                    />
                  </Grid>
                </Grid>
              }
              secondary={
                <div>
                  <span>
                    {data[id].registration}, {data[id].chassis}{" "}
                    {data[id].code && `(${data[id].code})`}
                  </span>
                  <span>Owner: {data[id].owner}</span>
                </div>
              }
            />
          </ListItem>
        ))}
      </MuiList>
    );
  };

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List title="Registration Tracker" bulkActionButtons={false} {...props}>
      {isSmall ? (
        <MySimpleList />
      ) : (
        <Datagrid rowStyle={postRowStyle}>
          <TextField label="Name" source="name" />
          <TextField label="Type" source="type" />
          <TextField label="Registration code" source="registration" />
          <TextField label="Chassis" source="chassis" />
          <TextField label="Code" source="code" />
          <TextField label="Owner" source="owner" />
          <DateField
            label="Expiry date"
            source="expires"
            options={{
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
          <EditButton basePath="/vehicles" />
          <DeleteButton basePath="/vehicles" />
        </Datagrid>
      )}
    </List>
  );
};

export default VehicleList;

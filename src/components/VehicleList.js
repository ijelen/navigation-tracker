import React, { useState, useEffect } from "react";
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
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
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

  const ImagePreview = ({ record, source }) => {
    const [imageUrl, setImageUrl] = useState(
      record[source].src.replace("image", "image_200x200")
    );
    // Reload the images after 1 second. That's needed because of the server resizing.
    useEffect(() => {
      const timeout = setTimeout(() => {
        setImageUrl(imageUrl + "?" + new Date());
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }, [imageUrl]);
    if (record[source]) {
      return (
        <Avatar
          variant="rounded"
          style={{ width: 90, height: 90, marginRight: 10 }}
          alt={record.name}
          src={imageUrl}
        />
      );
    } else {
      return null;
    }
  };

  const MySimpleList = () => {
    const { ids, data, basePath } = useListContext();
    return (
      <MuiList>
        {ids.map((id) => (
          <>
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
              <ListItemAvatar>
                <ImagePreview
                  record={data[id]}
                  source="image"
                  title="image.Image"
                />
              </ListItemAvatar>
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
            <Divider light={true} />
          </>
        ))}
      </MuiList>
    );
  };

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List
      title="Registration Tracker"
      bulkActionButtons={false}
      sort={{ field: "createdate", order: "DESC" }}
      {...props}
    >
      {isSmall ? (
        <MySimpleList />
      ) : (
        <Datagrid rowStyle={postRowStyle}>
          <ImagePreview label="Image" source="image" />
          <TextField label="Name" source="name" />
          <TextField label="CreateDate" source="createdate" />
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

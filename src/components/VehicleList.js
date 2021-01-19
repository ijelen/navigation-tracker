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
import "@fontsource/roboto";
import { List as MuiList } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import { formatRecord, capitalizeFirstLetter, daysLeft } from "../utils";
import { bgColors, defaultImage } from "../data/settings";

const ImagePreview = ({ record, source }) => {
  let tempImageUrl;
  if (record[source]) {
    tempImageUrl = record[source].src.replace("image", "image_200x200");
  } else {
    tempImageUrl = defaultImage;
  }
  const [imageUrl, setImageUrl] = useState(tempImageUrl);
  const [imageReloaded, setImageReloaded] = useState(false);
  // Reload the images after 3 second. That's needed because of the server resizing.
  useEffect(() => {
    if (!imageReloaded) {
      const timeout = setTimeout(() => {
        setImageUrl(imageUrl + "?" + new Date());
        setImageReloaded(true);
        console.log("Reload!");
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Avatar
      variant="rounded"
      style={{ width: 90, height: 90, marginRight: 10 }}
      alt={record.name}
      src={imageUrl}
    />
  );
};

const MySimpleList = () => {
  const { ids, data, basePath } = useListContext();
  return (
    <MuiList>
      {ids.map((id) => (
        <>
          <ListItem key={id} button component="a" href={`#${basePath}/${id}`}>
            <ListItemAvatar>
              <ImagePreview
                record={data[id]}
                source="image"
                title="image.Image"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <div>
                    <p style={{ fontSize: "1rem" }}>
                      {capitalizeFirstLetter(data[id].type)} {data[id].name}{" "}
                      {data[id].registration && `(${data[id].registration})`}
                    </p>
                    <p style={{ fontSize: ".8rem" }}>
                      {data[id].code && `Code: ${data[id].code}`}
                    </p>
                    <p style={{ fontSize: ".8rem" }}>
                      {data[id].chassis && `Chassis: ${data[id].chassis}`}
                    </p>
                    <p style={{ fontSize: ".8rem" }}>
                      {data[id].owner && `Owner: ${data[id].owner}`}
                    </p>
                  </div>
                  <div>
                    <LinearProgress
                      variant="determinate"
                      value={daysLeft(data[id].expires) * (1 / 365) * 100}
                      style={{ marginTop: ".5rem" }}
                      color="primary"
                    />
                    <Grid container justify="space-between">
                      <Grid item>
                        <span style={{ fontSize: ".8rem", color: "grey" }}>
                          {daysLeft(data[id].expires)} day
                          {daysLeft(data[id].expires) > 1 ? "s" : null} left
                        </span>
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
                          style={{ fontSize: ".8rem", color: "grey" }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </>
              }
            />
          </ListItem>
          <Divider light={true} />
        </>
      ))}
    </MuiList>
  );
};

const VehicleList = (props) => {
  const postRowStyle = (record, index) => {
    return {
      backgroundColor: formatRecord(record, {
        expired: bgColors.expired,
        expiring: bgColors.expiring,
      }),
    };
  };
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List
      title="Registration Tracker"
      bulkActionButtons={false}
      sort={{ field: "expires", order: "ASC" }}
      {...props}
    >
      {isSmall ? (
        <MySimpleList />
      ) : (
        <Datagrid rowStyle={postRowStyle}>
          <ImagePreview label="Image" source="image" />
          <TextField label="Name" source="name" />
          <TextField label="Expires" source="expires" />
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

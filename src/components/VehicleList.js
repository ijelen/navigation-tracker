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
import {
  TopToolbar,
  SortButton,
  CreateButton,
  ExportButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";
import "@fontsource/roboto";
import { List as MuiList } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AvatarWrapper from "./AvatarWrapper";
import Divider from "@material-ui/core/Divider";
import ExpiryLinearProgress from "./ExpiryLinearProgress";
import Typography from "@material-ui/core/Typography";

import { formatRecord, capitalizeFirstLetter } from "../utils";
import { useTheme } from "@material-ui/core/styles";

const MySimpleList = () => {
  const { ids, data, basePath } = useListContext();
  return (
    <MuiList>
      {ids.map((id) => (
        <>
          <ListItem key={id} button component="a" href={`#${basePath}/${id}`}>
            <ListItemAvatar>
              <AvatarWrapper
                record={data[id]}
                source="image"
                title="image.Image"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <div>
                    <Typography variant="subtitle1" component="h2">
                      {capitalizeFirstLetter(data[id].type)} {data[id].name}{" "}
                      {data[id].registration && `(${data[id].registration})`}
                    </Typography>
                    <Typography variant="subtitle2" component="p">
                      {data[id].code && `Code: ${data[id].code}`}
                    </Typography>
                    <Typography variant="subtitle2" component="p">
                      {data[id].chassis && `Chassis: ${data[id].chassis}`}
                    </Typography>
                    <Typography variant="subtitle2" component="p">
                      {data[id].owner && `Owner: ${data[id].owner}`}
                    </Typography>
                  </div>
                  <div>
                    <ExpiryLinearProgress
                      style={{ marginTop: ".5rem" }}
                      record={data[id]}
                    />
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

const ListActions = () => (
  <TopToolbar>
    <SortButton fields={["expires", "createdate"]} />
    <CreateButton basePath="/vehicles" />
    <ExportButton />
  </TopToolbar>
);

const VehicleList = (props) => {
  const theme = useTheme();
  const postRowStyle = (record, index) => {
    return {
      borderColor: theme.palette.primary.main,
      borderLeftColor: formatRecord(
        record,
        {
          expired: theme.palette.error.main,
          expiring: theme.palette.warning.main,
          default: "transparent",
        },
        theme.warnBeforeNumberOfDays
      ),
      borderLeftWidth: "2px",
      borderLeftStyle: "solid",
    };
  };
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List
      title="Registration Tracker"
      sort={{ field: "expires", order: "ASC" }}
      actions={<ListActions />}
      {...props}
    >
      {isSmall ? (
        <MySimpleList />
      ) : (
        <Datagrid rowStyle={postRowStyle}>
          <AvatarWrapper label="Image" source="image" sortable={false} />
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

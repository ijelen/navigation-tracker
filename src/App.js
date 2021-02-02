import React from "react";
import { Admin, Resource } from "react-admin";
import VehicleList from "./components/VehicleList";
import VehicleCreate from "./components/VehicleCreate";
import VehicleEdit from "./components/VehicleEdit";
import CommuteTwoToneIcon from "@material-ui/icons/CommuteTwoTone";
import { createMuiTheme } from "@material-ui/core/styles";
import firebase from "firebase";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import { isExpired, isExpiring } from "./utils";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const options = {
  logging: true,
  app: firebaseApp,
  persistence: "local",
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

const theme = createMuiTheme({
  typography: { caption: { color: "grey" }, subtitle2: { fontSize: ".75rem" } },
  warnBeforeNumberOfDays: 7,
  defaultImage: "/logo512.png",
  progressHundredPercent: 365,
});

function App() {
  return (
    <Admin
      title="Registration Tracker"
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={theme}
    >
      <Resource
        icon={CommuteTwoToneIcon}
        options={{ label: "Vehicles" }}
        name="vehicles"
        list={VehicleList}
        create={VehicleCreate}
        edit={VehicleEdit}
      />
    </Admin>
  );
}

export default App;

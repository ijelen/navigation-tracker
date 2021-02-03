import React from "react";
import { Admin, Resource } from "react-admin";
import VehicleList from "./components/VehicleList";
import VehicleCreate from "./components/VehicleCreate";
import VehicleEdit from "./components/VehicleEdit";
import CommuteTwoToneIcon from "@material-ui/icons/CommuteTwoTone";
import { dataProvider, authProvider } from "./firebaseProviders";
import theme from "./theme";

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

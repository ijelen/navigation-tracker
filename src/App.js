import React from "react";
import { Admin, Resource } from "react-admin";
import VehicleList from "./components/VehicleList";
import VehicleCreate from "./components/VehicleCreate";
import VehicleEdit from "./components/VehicleEdit";
import CommuteTwoToneIcon from "@material-ui/icons/CommuteTwoTone";
import { dataProvider, authProvider } from "./firebaseProviders";
import theme from "./theme";
import profile from "./profile";
import { Route } from "react-router-dom";
import MyLayout from "./MyLayout";

function App() {
  return (
    <Admin
      title="Registration Tracker"
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={theme}
      customRoutes={[
        <Route key="my-profile" path="/my-profile" component={profile.edit} />,
      ]}
      appLayout={MyLayout}
    >
      <Resource
        icon={CommuteTwoToneIcon}
        options={{ label: "Vehicles" }}
        name="vehicles"
        list={VehicleList}
        create={VehicleCreate}
        edit={VehicleEdit}
      />
      <Resource name="profile" />
    </Admin>
  );
}

export default App;

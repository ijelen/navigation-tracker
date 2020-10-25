import React from 'react';
import {Admin, Resource} from 'react-admin';
import VehicleList from './components/VehicleList';
import VehicleCreate from './components/VehicleCreate';
import VehicleEdit from './components/VehicleEdit';
import DriveIcon from '@material-ui/icons/DriveEta';
// import Dashboard from './components/Dashboard'

// import CustomLoginPage from './components/CustomLoginPage';

import {
  // FirebaseAuthProvider,
  FirebaseDataProvider,
  // FirebaseRealTimeSaga
} from 'react-admin-firebase';

 const firebaseConfig = {
    apiKey: "AIzaSyDFOxWWXOfBV1K6sMY1YI4O5uLtHQLpuuQ",
    authDomain: "evidencija-registracija.firebaseapp.com",
    databaseURL: "https://evidencija-registracija.firebaseio.com",
    projectId: "evidencija-registracija",
    storageBucket: "evidencija-registracija.appspot.com",
    messagingSenderId: "217728791466",
    appId: "1:217728791466:web:84998272648ae5b2e931d3",
    measurementId: "G-1RMEMNBEJ9"
  };

  const options = {
    logging: true
  };

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
// const authProvider = FirebaseAuthProvider(firebaseConfig);


function App() {
  
  return (
    <Admin title="Evidencija registracija" dataProvider={dataProvider} >
      <Resource icon={DriveIcon} options={{ label: 'Strojevi' }} name="vehicles" list={VehicleList} create={VehicleCreate} edit={VehicleEdit} />
    </Admin>
  );
}

export default App;

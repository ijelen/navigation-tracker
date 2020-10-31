import React from 'react';
import {Admin, Resource} from 'react-admin';
import VehicleList from './components/VehicleList';
import VehicleCreate from './components/VehicleCreate';
import VehicleEdit from './components/VehicleEdit';
import CommuteTwoToneIcon from '@material-ui/icons/CommuteTwoTone';
import firebase from 'firebase';
// import Dashboard from './components/Dashboard'

// https://github.com/stevekinney/think-piece

// import CustomLoginPage from './components/CustomLoginPage';

import {
  FirebaseAuthProvider,
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
const firebaseApp = firebase.initializeApp(firebaseConfig);

  const options = {
    logging: true,
    app: firebaseApp,
    persistence: 'local',
  };

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);


function App() {
  
  return (
    <Admin title="Evidencija registracija" dataProvider={dataProvider} authProvider={authProvider} >
      <Resource icon={CommuteTwoToneIcon} options={{ label: 'Evidencija registracija' }} name="vehicles" list={VehicleList} create={VehicleCreate} edit={VehicleEdit} />
    </Admin>
  );
}

export default App;

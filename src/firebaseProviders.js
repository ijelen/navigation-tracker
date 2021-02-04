import firebase from "firebase";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import { GET_ONE, UPDATE } from "react-admin";
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

// https://marmelab.com/blog/2019/03/07/react-admin-advanced-recipes-user-profile.html
// A function decorating a dataProvider for handling user profiles
const handleUserProfile = (dataProvider) => (verb, resource, params) => {
  // We know we only GET or UPDATE the profile as there is only one for the current user

  if (resource === "profile") {
    const db = firebase.firestore();
    if (verb === GET_ONE) {
      return new Promise((resolve, reject) => {
        (async () => {
          const user = await authProvider.checkAuth();
          const docRef = db.collection("users").doc(user.uid);
          const doc = await docRef.get();
          if (doc.exists) {
            // User doc exists
            resolve({
              data: {
                id: params.id,
                language: doc.data().language,
                email: doc.data().email,
                receiveEmail: doc.data().receiveEmail,
                weekdays: doc.data().weekdays,
                nickname: doc.data().nickname,
              },
            });
          } else {
            // User doc doesn't exist
            await docRef.set({ email: user.email });
            resolve({
              data: {
                id: params.id,
                language: "en",
                email: user.email,
                receiveEmail: true,
              },
            });
          }
        })();
      });
    }

    if (verb === UPDATE) {
      return new Promise((resolve, reject) => {
        (async () => {
          const user = await authProvider.checkAuth();
          const docRef = db.collection("users").doc(user.uid);
          await docRef.set({
            email: params.data.email,
            language: params.data.language,
            receiveEmail: params.data.receiveEmail,
            weekdays: params.data.weekdays,
            nickname: params.data.nickname,
          });
          resolve({ data: params.data });
        })();
      });
    }
  }
  // Fallback to the dataProvider default handling
  return dataProvider(verb, resource, params);
};

export const dataProvider = handleUserProfile(
  FirebaseDataProvider(firebaseConfig, options)
);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

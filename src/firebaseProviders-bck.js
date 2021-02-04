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
  // To showcase how we can do something completely different here, we'll store it in local storage
  // You can replace this with a customized fetch call to your own API route too
  if (resource === "profile") {
    const { id, ...p } = params; // removes the id from the params
    if (p.data) delete p.data.id; // when updates there is data object that is passed to the backend

    const db = firebase.firestore();
    if (verb === GET_ONE) {
      const getUserProfile = async () => {
        const user = await authProvider.checkAuth();
        // console.log("user object => ", user);
        const docRef = db.collection("users").doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              // User doc does exist
              console.log("User data:", doc.data());
              return {
                data: params.data,
              };
            } else {
              // User doc doesn't exist
              // Create one and return resolved Promise
              docRef
                .set({ email: user.email })
                .then(() => {
                  console.log("Document successfully written!");
                  return {
                    data: params.data,
                  };
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      };
      getUserProfile();
      // No profile yet, return a default one
      // It's important that we send the same id as requested in params
      // Indeed, react-admin will verify it and may throw an error if they are different
      // I don't have to do it when the profile exists as it will be included in the data stored in the local storage
      // return Promise.resolve({
      //   data: { id: params.id, language: "en" },
      // });
    }

    if (verb === UPDATE) {
      // localStorage.setItem("profile", JSON.stringify(params.data));
      return Promise.resolve({ data: params.data });
    }
  }

  // Fallback to the dataProvider default handling
  return dataProvider(verb, resource, params);
};

export const dataProvider = handleUserProfile(
  FirebaseDataProvider(firebaseConfig, options)
);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

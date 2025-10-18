import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "<API_KEY>",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "<AUTH_DOMAIN>",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "<PROJECT_ID>",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "<STORAGE_BUCKET>",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "<SENDER_ID>",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "<APP_ID>",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
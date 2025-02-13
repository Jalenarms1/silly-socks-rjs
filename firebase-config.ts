// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: "silly-socks-e0923.firebaseapp.com",
  projectId: "silly-socks-e0923",
  storageBucket: "silly-socks-e0923.firebasestorage.app",
  messagingSenderId: "851499145836",
  appId: "1:851499145836:web:f9ba86fa8c615e3925d649",
  measurementId: "G-H8WWSVEVQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const functions = getFunctions(app);

export { functions };


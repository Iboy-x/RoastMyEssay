import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJPEu6j4LSv4vI43G-Cbr9_iKtErb9pnM",
  authDomain: "roastmyessay.firebaseapp.com",
  projectId: "roastmyessay",
  appId: "1:871652459681:web:e7bd3a6ad20bf05477dce0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

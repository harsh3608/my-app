// Firebase configuration and initialization for Firestore
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV1xZ3ven22zdJgJsmM7HeIiQwvY7kzbs",
  authDomain: "hostel-fire.firebaseapp.com",
  databaseURL: "https://hostel-fire-default-rtdb.firebaseio.com",
  projectId: "hostel-fire",
  storageBucket: "hostel-fire.firebasestorage.app",
  messagingSenderId: "59594017056",
  appId: "1:59594017056:web:00f038caa12d5b4fc1af45",
  measurementId: "G-0JHW7YQ60G"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

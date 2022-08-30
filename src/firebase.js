import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtB-i3xkNxQubNy6oKam0t9UuOLcpYapE",
  authDomain: "expense-management-7b4c9.firebaseapp.com",
  projectId: "expense-management-7b4c9",
  storageBucket: "expense-management-7b4c9.appspot.com",
  messagingSenderId: "714022233756",
  appId: "1:714022233756:web:e1f3602d7802824d82af59",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

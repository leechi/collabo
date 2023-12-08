import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAdFzIEkkwHvTRdFhiZt62iePONZFv-ciY",
  authDomain: "collabo-2e452.firebaseapp.com",
  projectId: "collabo-2e452",
  storageBucket: "collabo-2e452.appspot.com",
  messagingSenderId: "599387209777",
  appId: "1:599387209777:web:6d44325c99c284b9705510",
  measurementId: "G-2R0KPQ1KZ5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
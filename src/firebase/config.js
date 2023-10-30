import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB8xDeOIQZZ2RcbSL3idTHd6JILpyUqwU",
  authDomain: "messageapp-645f6.firebaseapp.com",
  projectId: "messageapp-645f6",
  storageBucket: "messageapp-645f6.appspot.com",
  messagingSenderId: "647142739432",
  appId: "1:647142739432:web:53c48eecd3d2020156a85d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

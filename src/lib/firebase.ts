import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// connectStorageEmulator(storage, "localhost", 9199);
const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);
const catRef = collection(db, "Cats");

export { storage, db, catRef };

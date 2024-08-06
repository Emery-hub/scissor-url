import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBQcylB4n4_6696-pHyWXAJQmiGvxw56m0",
  authDomain: "scissor-8c3bf.firebaseapp.com",
  projectId: "scissor-8c3bf",
  storageBucket: "scissor-8c3bf.appspot.com",
  messagingSenderId: "249324222161",
  appId: "1:249324222161:web:3da3606addd5425a4ff7f0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, firestore, auth };

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCEeWo1os-n_SmcVXjVEvQ2baAaAzW2vTw",
  authDomain: "scissor-url-47c6d.firebaseapp.com",
  projectId: "scissor-url-47c6d",
  storageBucket: "scissor-url-47c6d.appspot.com",
  messagingSenderId: "976710948717",
  appId: "1:976710948717:web:38adfb35372574b516ac64",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export { app, firestore, auth };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAwecXecvC7eE6sUUGdHff4Pcd7DKoxv-g",
    authDomain: "clone-80f0c.firebaseapp.com",
    projectId: "clone-80f0c",
    storageBucket: "clone-80f0c.appspot.com",
    messagingSenderId: "268884594055",
    appId: "1:268884594055:web:34697302a0167f2e099722",
    measurementId: "G-TFCVMJPYD1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }
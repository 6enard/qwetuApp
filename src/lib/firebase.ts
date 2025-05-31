import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEG7QnBG-Q7FsL4E4aB3EdV1k-QXaLxcs",
  authDomain: "qwetu-eda5a.firebaseapp.com",
  projectId: "qwetu-eda5a",
  storageBucket: "qwetu-eda5a.firebasestorage.app",
  messagingSenderId: "483604997271",
  appId: "1:483604997271:web:66a38835c644c0b91535d2",
  measurementId: "G-74XWSY45GC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
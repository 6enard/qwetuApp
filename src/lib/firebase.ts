import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEG7QnBG-Q7FsL4E4aB3EdV1k-QXaLxcs",
  authDomain: "qwetu-eda5a.firebaseapp.com",
  projectId: "qwetu-eda5a",
  storageBucket: "qwetu-eda5a.appspot.com",
  messagingSenderId: "483604997271",
  appId: "1:483604997271:web:66a38835c644c0b91535d2",
  measurementId: "G-74XWSY45GC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported
export const analytics = await isSupported().then(yes => yes ? getAnalytics(app) : null);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with offline persistence
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Multiple tabs open, persistence disabled');
    } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Current browser doesn\'t support persistence');
    }
});
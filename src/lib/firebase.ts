// firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEG7QnBG-Q7FsL4E4aB3EdV1k-QXaLxcs",
  authDomain: "qwetu-eda5a.firebaseapp.com",
  projectId: "qwetu-eda5a",
  storageBucket: "qwetu-eda5a.appspot.com",
  messagingSenderId: "483604997271",
  appId: "1:483604997271:web:66a38835c644c0b91535d2",
  measurementId: "G-74XWSY45GC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence disabled');
  } else if (err.code === 'unimplemented') {
    console.warn('Current browser doesn\'t support persistence');
  }
});

// Lazy-load Analytics only if supported
let analytics: ReturnType<typeof getAnalytics> | null = null;
(async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
})();

export { analytics };

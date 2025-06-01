import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDEG7QnBG-Q7FsL4E4aB3EdV1k-QXaLxcs",
  authDomain: "qwetu-eda5a.firebaseapp.com",
  projectId: "qwetu-eda5a",
  storageBucket: "qwetu-eda5a.appspot.com",
  messagingSenderId: "483604997271",
  appId: "1:483604997271:web:66a38835c644c0b91535d2",
  measurementId: "G-74XWSY45GC",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence disabled');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser doesn\'t support persistence');
  }
});

export const ADMIN_EMAIL = '6enard@gmail.com';
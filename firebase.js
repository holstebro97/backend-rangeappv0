// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, 
         GoogleAuthProvider, 
         sendSignInLinkToEmail,
         isSignInWithEmailLink,
         signInWithEmailLink,
         connectAuthEmulator,
         setPersistence,
         browserLocalPersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics on the client side
let analytics = null;
if (typeof window !== 'undefined') {  // Check if we're on the client side
  // Optionally wrap in isSupported check
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const db = getFirestore(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

// Initialize providers
const googleProvider = new GoogleAuthProvider();

// Configure email link settings
const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000', // Your app's URL
  handleCodeInApp: true,
};

export { 
  auth, 
  db, 
  googleProvider, 
  actionCodeSettings,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  analytics
};
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase configuration
// Go to https://console.firebase.google.com/ and create a new project
// Then go to Project Settings > General > Your apps > Web app
// Copy the config object and replace the one below
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// For development, you can use this demo config (but data won't persist)
const demoConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Use demo config for now - replace with real config when ready
const app = initializeApp(demoConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

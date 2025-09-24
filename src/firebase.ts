import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvQZ8Q9X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L",
  authDomain: "globeguessr-auth.firebaseapp.com",
  projectId: "globeguessr-auth",
  storageBucket: "globeguessr-auth.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

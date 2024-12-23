import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6OtnbGMbiei92kih1NYsoVEkBVp033pQ",
  authDomain: "meta-hub-fa271.firebaseapp.com",
  projectId: "meta-hub-fa271",
  storageBucket: "meta-hub-fa271.firebasestorage.app",
  messagingSenderId: "922398052635",
  appId: "1:922398052635:android:fb46c84fd924639fdf83be",
  measurementId: "G-LTPQCWLPE0"
};

const app = initializeApp(firebaseConfig);
export const my_auth = getAuth(app);
export const db = getFirestore(app);
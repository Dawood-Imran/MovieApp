import firebase from 'firebase/compat/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8UqY0zmm0F61tKqMyvYRjwygWFPucSng",
  authDomain: "fa21-bse-031.firebaseapp.com",
  projectId: "fa21-bse-031",
  storageBucket: "fa21-bse-031.firebasestorage.app",
  messagingSenderId: "94225538583",
  appId: "1:94225538583:web:ada3d50fc7810ef0960652",
  measurementId: "G-LTPQCWLPE0"
};
const app = firebase.initializeApp(firebaseConfig);
export const my_auth = getAuth(app);
export const db = getFirestore(app)
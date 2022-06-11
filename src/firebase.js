import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBiwiCMNS9CXqgjRe_riXrtv06FZer1D3Y',
  authDomain: 'netflix-1be0d.firebaseapp.com',
  projectId: 'netflix-1be0d',
  storageBucket: 'netflix-1be0d.appspot.com',
  messagingSenderId: '640936837358',
  appId: '1:640936837358:web:cff758df7abf40fb36b3ff',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
export default db;

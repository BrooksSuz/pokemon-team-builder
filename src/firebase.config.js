import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkOisj0Kn2lzwSN1rx5oee8sR0bqY6j4Y",
  authDomain: "pokemon-team-builder-e7dd8.firebaseapp.com",
  databaseURL: "https://pokemon-team-builder-e7dd8.firebaseio.com/",
  projectId: "pokemon-team-builder-e7dd8",
  storageBucket: "pokemon-team-builder-e7dd8.appspot.com",
  messagingSenderId: "1050592444895",
  appId: "1:1050592444895:web:d360ba1d2d4463279d846a"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const paldeaPokdexRef = doc(firestore, 'gen-ix/pokedex');
const db = getFirestore();

const getPaldeaPokedex = async () => {
  const mySnapshot = await getDoc(paldeaPokdexRef);
  if (mySnapshot.exists()) {
    return mySnapshot.data().paldea;
  }
}; 

const loginEmailPassword = async (email, pass) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
    return userCredentials.user.email;
  } catch(error) {
    return null;
  }
};

const createAccount = async (email, pass) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      email: userCredentials.user.email
    });
    return userCredentials.user.email;
  } catch(error) {
    console.log(error);
    return null;
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  getPaldeaPokedex,
  loginEmailPassword,
  createAccount,
  logout
};

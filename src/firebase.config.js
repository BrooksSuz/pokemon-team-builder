import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
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

// Initialization and reference variables
let userUID = '';
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth(app);
const paldeaPokdexRef = doc(firestore, 'gen-ix/pokedex');

// Function that gets pokedex information
const getPaldeaPokedex = async () => {
  const mySnapshot = await getDoc(paldeaPokdexRef);
  if (mySnapshot.exists()) {
    return mySnapshot.data().paldea;
  }
}; 

// Function that creates new user accounts
const createAccount = async (email, pass) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, pass);

    await setDoc(doc(firestore, 'users', userCredentials.user.uid), {
      parties: {
        'party-1': [],
        'party-2': [],
        'party-3': []
      }
    });
    
    userUID = userCredentials.user.uid;
    return userCredentials.user.email;
  } catch(error) {
    return null;
  }
};

// Function that logs users in
const loginEmailPassword = async (email, pass) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
    userUID = userCredentials.user.uid;
    return userCredentials.user.email;
  } catch(error) {
    return null;
  }
};

const getParties = async () => {
  const userRef = doc(firestore, 'users', userUID);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

// Function that adds/updates the user's parties
const updateParty = async (arr, selectedOption) => {
  const userRef = doc(firestore, 'users', userUID);

  if (selectedOption === 'party-1') {
    await updateDoc(userRef, {
      'parties.party-1': arr
    });
  } else if (selectedOption === 'party-2') {
    await updateDoc(userRef, {
      'parties.party-2': arr
    });
  } else if (selectedOption === 'party-3') {
    await updateDoc(userRef, {
      'parties.party-3': arr
    });
  }
};

// Function that logs users out
const logout = async () => {
  await signOut(auth);
};

export {
  getPaldeaPokedex,
  loginEmailPassword,
  createAccount,
  getParties,
  updateParty,
  logout
};

import { firestore, auth } from './firebase.config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const paldeaPokedexRef = doc(firestore, 'gen-ix/pokedex');
const blankParty = Array.from({ length: 6 }, () => {
  return { pokeName: '', pokeSprite: '', pokeType: '' };
});
let userUID = '';

// Persist user if they're signed in
onAuthStateChanged(auth, currentUser => {
  if (currentUser) {
    userUID = currentUser.uid;
  }
});

// Get pokemon name and sprite
const getPaldeaPokedex = async () => {
  const mySnapshot = await getDoc(paldeaPokedexRef);
  if (mySnapshot.exists()) {
    return mySnapshot.data().paldea;
  }
}; 

// Get pokemon type data
const getPokemonTypes = async () => {
  const mySnapshot = await getDoc(paldeaPokedexRef);
  if (mySnapshot.exists()) {
    return mySnapshot.data().types;
  }
};

// Create new user
const createAccount = async (email, pass) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, pass);

    await setDoc(doc(firestore, 'users', userCredentials.user.uid), {
      parties: {
        'party-1': blankParty,
        'party-2': blankParty,
        'party-3': blankParty
      }
    });
    
    userUID = userCredentials.user.uid;
    return userCredentials.user.email;
  } catch(error) {
    return null;
  }
};

// Log user in
const loginEmailPassword = async (email, pass) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
    userUID = userCredentials.user.uid;
    return userCredentials.user.email;
  } catch(error) {
    return null;
  }
};

// Get the user's existing parties
const getParties = async () => {
  const userRef = doc(firestore, 'users', userUID);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

// Add/update the user's parties
const updateParty = async (arr, clickedButton) => {
  const userRef = doc(firestore, 'users', userUID);

  if (clickedButton === 'party-1') {
    await updateDoc(userRef, {
      'parties.party-1': arr
    });
  } else if (clickedButton === 'party-2') {
    await updateDoc(userRef, {
      'parties.party-2': arr
    });
  } else if (clickedButton === 'party-3') {
    await updateDoc(userRef, {
      'parties.party-3': arr
    });
  }
};

// Log user out
const logout = async () => {
  userUID = '';
  await signOut(auth);
};

export {
  getPaldeaPokedex,
  getPokemonTypes,
  loginEmailPassword,
  createAccount,
  getParties,
  updateParty,
  logout
};

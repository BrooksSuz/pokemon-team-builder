import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

const paldeaPokdexRef = doc(firestore, 'gen-ix/pokedex');

const paldeaPokedex = async () =>{
  const mySnapshot = await getDoc(paldeaPokdexRef);
  if (mySnapshot.exists()) {
    const docData = mySnapshot.data();
    console.log(docData);
  }
}; 

export default paldeaPokedex;

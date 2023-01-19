import { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./HeaderComponents/Header";
import PokemonParty from "./PokemonPartyComponents/PokemonParty";
import PaldeaPokedex from "./PaldeaPokedexComponents/PaldeaPokedex";
import TypeChart from "./TypeChartComponents/TypeChart";
import "../styles/app.css";
import "../styles/header.css";
import "../styles/paldeaPokedex.css";
import "../styles/pokemonParty.css";
import "../styles/reset.css";
import "../styles/typeChart.css";

const App = () => {
  /*
    Party represents the current group of pokemon selected by the user. Each party pokemon is an object that contains a name, a sprite (a URL containing the respective image), and at least one type. Each of these variables are represented by a string.
  */
  const [party, setParty] = useState(
    Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    }
  ));

  // User represents a string of the logged in user's email
  const [user, setUser] = useState('');

  // UserSignedIn represents the login status of the current user
  const [userSignedIn, setUserSignedIn] = useState(false);

  // If the user is persisted, set their email and login status
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser.email);
        setUserSignedIn(true);
      }
    });
  }, []);

  return (
    <>
      <Header
        party={party}
        setParty={setParty}
        user={user}
        setUser={setUser}
        userSignedIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
      />
      <PokemonParty
        party={party}
        setParty={setParty}
      />
      <PaldeaPokedex
        party={party}
        setParty={setParty}
      />
      <TypeChart
        party={party}
      />
      <footer className='container'>
        <span>Pokémon is © of Nintendo, 1995-2023</span>
      </footer>
    </>
  );
};

export default App;

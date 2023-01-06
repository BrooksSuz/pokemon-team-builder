import { useState } from 'react';
import Header from './AppComponents/Header';
import PokemonParty from './AppComponents/PokemonParty';
import PaldeaPokedex from './AppComponents/PaldeaPokedex';
import TypeChart from './AppComponents/TypeChart';
import '../styles/Reset.css';
import '../styles/App.css';

const App = () => {
  /*
    Party represents the current group of pokemon selected by the user. Each party pokemon contains a name, a sprite (a URL containing the respective image), and at least one type. Each of these variables are represented by a string.
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

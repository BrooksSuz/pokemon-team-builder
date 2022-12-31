import { useState } from 'react';
import Header from './Header';
import PokemonParty from './PokemonParty';
import '../styles/App.css';
import '../styles/Pokemon.css';
import TypeChart from './TypeChart';
import PaldeaPokedex from './PaldeaPokedex';

const App = () => {
  // Start state variables
  const [party, setParty] = useState(
    Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    }
  ));
  const [user, setUser] = useState('');
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
        userSignedIn={userSignedIn}
      />
      <PaldeaPokedex
        party={party}
        setParty={setParty}
      />
      <TypeChart
        party={party}
      />
    </>
  );
};

export default App;

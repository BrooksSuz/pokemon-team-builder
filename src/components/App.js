import { useState } from 'react';
import Header from './Header';
import PokemonParty from './PokemonParty';
import PaldeaPokedex from './PaldeaPokedex';
import TypeChart from './TypeChart';
import '../styles/Reset.css';
import '../styles/App.css';

const App = () => {
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

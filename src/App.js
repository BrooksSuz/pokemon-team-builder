import { useState } from 'react';
import Header from './components/Header';
import PokemonParty from './components/PokemonParty';
import './styles/App.css';
import './styles/Pokemon.css';
import TypeChart from './components/TypeChart';
import PaldeaPokedex from './components/PaldeaPokedex';

const App = () => {
  // Start state variables
  const [party, setParty] = useState(
    Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    }
  ));
  const [user, setUser] = useState('');
  const [userSignedIn, setUserSignedIn] = useState(false);
  // End state variables
  
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

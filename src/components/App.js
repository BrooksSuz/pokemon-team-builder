import { useState } from 'react';
import Header from './AppComponents/Header';
import PokemonParty from './AppComponents/PokemonParty';
import PaldeaPokedex from './AppComponents/PaldeaPokedex';
import TypeChart from './AppComponents/TypeChart';
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
      <footer className='container'>
        <span>Pokémon is © of Nintendo, 1995-2023</span>
      </footer>
    </>
  );
};

export default App;

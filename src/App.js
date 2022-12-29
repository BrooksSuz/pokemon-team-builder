import { useState, useEffect, useRef } from 'react';
import PartySlot from './components/PartySlot';
import FormTeamCreation from './components/FormTeamCreation';
import FormLogin from './components/FormLogin';
import FormCreateAccount from './components/FormCreateAccount';
import LoggedIn from './components/LoggedIn';
import PokemonCard from './components/PokemonCard';
import { getPaldeaPokedex, getPokemonTypes } from "./firebase.config";
import './styles/App.css';
import './styles/Pokemon.css';
import TypeChart from './components/TypeChart';

const App = () => {
  // Start state variables
  const [party, setParty] = useState(
    Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    }
  ));
  const [pokedex, setPokedex] = useState({ poke: [], types: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState('');
  const [userSignedIn, setUserSignedIn] = useState(false);
  // End state variables
  
  // Start ref 
  const divFormContainer = useRef();
  const formLogin = useRef();
  const formCreate = useRef();
  const btnHideComponents = useRef();
  const btnDeleteAll = useRef();
  const spanInfo = useRef();
  // End ref variables

  // Start functions
  const onClickDeleteParty = () => {
    const arr = Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    });
    setParty(arr);
  };

  const onClickDisplayLogin = () => {
    const divStyle = divFormContainer.current.style;

    if (divStyle.display === 'none') {
      divStyle.display = 'block';
    } else if (divStyle.display === 'block') {
      divStyle.display = 'none';
    }
  };

  const onClickChangeDisplayForms = () => {
    const loginStyle = formLogin.current.style;
    const createStyle = formCreate.current.style;
    const btnCurrent = btnHideComponents.current;

    if (loginStyle.display === 'block' && createStyle.display === 'none') {
      loginStyle.display = 'none';
      createStyle.display ='block';
      btnCurrent.textContent = 'Whoopsie, take me back';
    } else {
      loginStyle.display = 'block';
      createStyle.display = 'none';
      btnCurrent.textContent = 'Need an account?';
    }
  };

  const fillPokedex = async () => {
    const copyPokedex = Object.assign({}, pokedex);
    const paldeaPokedex = await getPaldeaPokedex();
    const paldeaTypes = await getPokemonTypes();

    copyPokedex.poke = paldeaPokedex;
    copyPokedex.types = paldeaTypes;

    setPokedex(copyPokedex);
  };
  // End functions

  useEffect(() => {
    fillPokedex();
  }, []);

  useEffect(() => {
    const divStyle = divFormContainer.current.style;

    if (userSignedIn) {
      divStyle.display = 'none';
    }
  }, [userSignedIn]);

  useEffect(() => {
    const btnStyle = btnDeleteAll.current.style;
    const spanStyle = spanInfo.current.style;
    const test = party.some(slot => {
      for (const key in slot) {
        return slot[key] === '' ? false : true;
      }
      return null;
    });

    if (test || userSignedIn) {
      btnStyle.visibility = 'visible'
      spanStyle.visibility ='hidden'
    } else {
      btnStyle.visibility = 'hidden';
      spanStyle.visibility = 'visible';
    }
  }, [party, userSignedIn]);

  return (
    <>
      <header>
        <h1>Pokemon Scarlet & Violet Team Builder</h1>
        {
          userSignedIn
            ? <LoggedIn
                setParty={setParty}
                user={user}
                setUser={setUser}
                setUserSignedIn={setUserSignedIn}
              />
            : <button onClick={onClickDisplayLogin}>Show/Hide Login Form</button>
        }
      </header>

      {/* Start pokemon-container */}
      <div className='pokemon-container'>

        {/* Start FormLogin */}
        <div
          className='container form-container'
          style={{ display: 'none' }}
          ref={divFormContainer}
        >
          <FormLogin
            setUser={setUser}
            setUserSignedIn={setUserSignedIn}
            ref={formLogin}
          />
          <FormCreateAccount
            setUser={setUser}
            setUserSignedIn={setUserSignedIn}
            ref={formCreate}
          />
          <button
            type='button'
            onClick={onClickChangeDisplayForms}
            ref={btnHideComponents}
          >
            Need an account?
          </button>
        </div>
        {/* End FormLogin */}

        {/* Start pokemon-party */}
        <div className='pokemon-party container'>
          <h2
            style={{ position: 'absolute', alignSelf: 'flex-start' }}
          >
            Party Pokemon
          </h2>
          <span
            style={{ position: 'absolute', alignSelf: 'flex-end' }}
            ref={spanInfo}
          >
            Your pokemon will show up here
          </span>
          <button
            style={{ visibility: 'hidden', margin: '20px', position: 'absolute', alignSelf: 'flex-start' }}
            onClick={onClickDeleteParty}
            ref={btnDeleteAll}
          >
            Delete Entire Party
          </button>
          {
            Array.from(
              { length: 6 }, (_, i) => 
              <PartySlot
                party={party}
                setParty={setParty}
                i={i}
                key={i}
              />
            )
          }
          <FormTeamCreation
            party={party}
            setParty={setParty}
            userSignedIn={userSignedIn}
          />
        </div>
        {/* End pokemon-party */}

        {/* Start pokemon-list */}
        <div className='pokemon-list container'>
          <h2>Paldea Pokedex</h2>
          <label>
            Search Pokedex:
            <input
              type='text'
              name='search-dex'
              placeholder='Paldea Awaits...'
              onChange={e => setSearchTerm(e.target.value)}
            />
          </label>

          {/* Start entry-container */}
          <div className='entry-container'>
            {
              pokedex.poke
                .filter((pokemon, i) => {
                  return searchTerm === ''
                    ? pokemon
                    : pokemon.includes(searchTerm) || pokedex.types[i].includes(searchTerm);
                })
                .map((pokemon, index) => (
                <PokemonCard
                  party={party}
                  setParty={setParty}
                  poke={pokedex.poke}
                  pokemon={pokemon}
                  types={pokedex.types}
                  index={index}
                  key={index}
                />
              ))
            }
          </div>
          {/* End entry-container */}

        </div>
        {/* End pokemon-list */}

        <TypeChart party={party} />

      </div>
      {/* End pokemon-container */}
    </>
  );
};

export default App;

import { useState, useEffect, useRef } from 'react';
import PartySlot from './components/PartySlot';
import FormTeamCreation from './components/FormTeamCreation';
import FormLogin from './components/FormLogin';
import FormCreateAccount from './components/FormCreateAccount';
import LoggedIn from './components/LoggedIn';
import PokemonCard from './components/PokemonCard';
import { getPaldeaPokedex } from "./firebase.config";
import './styles/App.css';
import './styles/Pokemon.css';

const App = () => {
  // Start state variables
  const [party, setParty] = useState(
    Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '' };
    }
  ));
  const [pokedex, setPokedex] = useState([]);
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
      return { pokeName: '', pokeSprite: '' };
    });
    setParty(arr);
  };

  const onClickDisplayLogin = (e) => {
    const divStyle = divFormContainer.current.style;

    if (divStyle.display === 'none') {
      divStyle.display = 'block';
    } else if (divStyle.display === 'block') {
      divStyle.display = 'none';
    }
  };

  const changeDisplayForms = () => {
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
  // End functions

  useEffect(() => {
    getPaldeaPokedex().then(res => setPokedex(res));
  }, []);

  useEffect(() => {
    const btnStyle = btnDeleteAll.current.style;
    const spanStyle = spanInfo.current.style;
    const test = party.some(slot => {
      for (const key in slot) {
        return slot[key] === '' ? false : true;
      }
      return null;
    });

    if (test) {
      btnStyle.visibility = 'visible'
      spanStyle.visibility ='hidden'
    } else {
      btnStyle.visibility = 'hidden';
      spanStyle.visibility = 'visible';
    }
  }, [party]);

  return (
    <>
      <header>
        <h1>Pokemon Scarlet & Violet Team Builder</h1>
        <button onClick={onClickDisplayLogin}>Show/Hide Login Form</button>
      </header>

      {/* Start pokemon-container */}
      <div
        className='pokemon-container'
      >

      {/* Start FormLogin */}
      {
        !userSignedIn
          ? <div
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
                onClick={changeDisplayForms}
                ref={btnHideComponents}
              >
                Need an account?
              </button>
            </div>
          : <LoggedIn
              setParty={setParty}
              user={user}
              setUser={setUser}
              setUserSignedIn={setUserSignedIn}
            />
      }
      {/* End FormLogin */}

        {/* Start pokemon-party */}
        <div
          className='pokemon-party container'
        >
          <span
            style={{ position: 'absolute' }}
            ref={spanInfo}
          >Your pokemon will show up here</span>
          <button
            style={{ visibility: 'hidden', margin: '10px', position: 'absolute', alignSelf: 'flex-start' }}
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
        <div
        className='pokemon-list container'
        >
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
              pokedex
                .filter(pokemon => {
                  return searchTerm === ''
                    ? pokemon
                    : pokemon.includes(searchTerm);
                })
                .map((pokemon, i) => (
                <PokemonCard
                  party={party}
                  setParty={setParty}
                  pokedex={pokedex}
                  pokemon={pokemon}
                  i={i}
                  key={i}
                />
              ))
            }
          </div>
          {/* End entry-container */}

        </div>
        {/* End pokemon-list */}

      </div>
      {/* End pokemon-container */}
    </>
  );
};

export default App;

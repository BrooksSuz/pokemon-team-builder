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
  const formLogin = useRef();
  const formCreate = useRef();
  const btnHideComponents = useRef();
  // End ref variables

  // Start functions
  const onClickDeleteParty = () => {
    const arr = Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '' };
    });
    setParty(arr);
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

  return (
    <>
      <header>
        <h1>Pokemon Scarlet & Violet Team Builder</h1>
        <p>This is a team builder for the newest Pokemon games.</p>
        <button
          style={{ alignSelf: 'flex-start' }}
          onClick={onClickDeleteParty}
          >
            Delete Entire Party
        </button>
        {
          !userSignedIn
            ?  <>
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
              </>
            : <LoggedIn
                user={user}
                setUser={setUser}
                setUserSignedIn={setUserSignedIn}
              />
        }
        
      </header>

      {/* Start parent of pokemon-party & pokemon-list */}
      <div
        className='pokemon-container'
      >

        {/* Start pokemon-party */}
        <div
          className='pokemon-party'
        >
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
        </div>
        {/* End pokemon-party */}

        {/* Start pokemon-list */}
        <div
        className='pokemon-list'
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

          <FormTeamCreation
            userSignedIn={userSignedIn}
            party={party}
            setParty={setParty}
          />

        </div>
        {/* End pokemon-list */}

      </div>
      {/* End parent of pokemon-party & pokemon-list */}
        
      <footer>
        <span>This project was made by me :D</span>
      </footer>
    </>
  );
};

export default App;

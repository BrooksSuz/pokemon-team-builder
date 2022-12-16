import { useState, useEffect } from 'react';
import PartySlot from './components/PartySlot';
import getPaldeaPokedex from "./firebase.config";
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
  // End state variables

  const onClickAddPokemon = pokemon => {
    const copyParty = [...party];

    // Add sprite
    for (let i = 0; i < copyParty.length; i++) {
      if (copyParty[i].pokeSprite === '') {
        copyParty[i].pokeSprite = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon.charAt(0).toLowerCase() + pokemon.slice(1)}.png`;
        break;
      }
    }

    // Add name
    for (let i = 0; i < copyParty.length; i++) {
      if (copyParty[i].pokeName === '') {
        copyParty[i].pokeName = pokemon;
        break;
      }
    }

    setParty(copyParty);
  };

  useEffect(() => {
    getPaldeaPokedex().then(res => setPokedex(res));
  }, []);

  return (
    <>
    <header data-testid='header'>
      <button>Delete Entire Party</button>
      <h1>Pokemon Scarlet & Violet Team Builder</h1>
      <p>This is a team builder for the newest Pokemon games.</p>
    </header>

    {/* Start parent of pokemon-team & pokemon-list */}
    <div
      className='pokemon-container'
      data-testid='pokemonContainer'
    >

      {/* Start pokemon-team */}
      <div
        className='pokemon-team'
        data-testid='pokemonTeam'
      >
        {
          Array.from({ length: 6 }, (_, i) => 
            <PartySlot
              party={party}
              setParty={setParty}
              i={i}
              key={i}
            />
          )
        }
      </div>
      {/* End pokemon-team */}

      {/* Start pokemon-list */}
      <div
      className='pokemon-list'
      data-testid='pokemonList'
      >
        <label> Search Pokedex:
          <input
            type='text'
            name='search-dex'
            placeholder='Paldea Awaits...'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>

        {/* Start entry-container */}
        <div
          className='entry-container'
        >
          {
            pokedex
              .filter(pokemon => {
                return searchTerm === ''
                  ? pokemon
                  : pokemon.includes(searchTerm);
              })
              .map((pokemon, i) => (
              <button
                className='entry'
                key={i}
                onClick={e => onClickAddPokemon(e.target.childNodes[2].textContent)}
              >
                <span>
                  {
                    pokedex.findIndex(entry => {
                      return pokemon === entry
                        ? true
                        : false
                    }) + 1
                  }
                </span>
                <img
                  src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png`}
                  alt={`pokedex entry number ${i + 1}`} 
                  height='64'
                  width='64'
                  style={{ marginBottom: '5px' }}
                />
                <span>
                  {
                    pokemon.includes('-')
                      ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
                      : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
                  }
                </span>
              </button>
            ))
          }
        </div>
        {/* End entry-container */}

      </div>
      {/* End pokemon-list */}

    </div>
    {/* End parent of pokemon-team & pokemon-list */}
      
    <footer data-testid='footer'>
      This project was made by me :D
    </footer>
    </>
  );
};

export default App;

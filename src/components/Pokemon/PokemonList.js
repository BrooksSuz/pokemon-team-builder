import { useState, useEffect } from "react";
import getPaldeaPokedex from "../../firebase.config";

const PokemonList = () => {
  const [pokedex, setPokedex] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPaldeaPokedex().then(res => setPokedex(res));
  }, []);

  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      <label> Search Pokedex:
        <input
          type='text'
          name='search-dex'
          placeholder='Search Paldea...'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
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
            <div
              className='entry'
              key={i}
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
              <span>{pokemon}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PokemonList;

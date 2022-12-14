import { useState, useEffect } from "react";
import getPaldeaPokedex from "../../firebase.config";
import PokemonSprites from "./PokemonSprites";

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
          placeholder='Paldea Awaits...'
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
              <PokemonSprites
                pokemon={pokemon}
                i={i}
              />
              <span>
                {
                  pokemon.includes('-')
                    ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
                    : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
                }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PokemonList;

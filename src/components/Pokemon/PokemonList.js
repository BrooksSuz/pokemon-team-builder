import { useState, useEffect } from "react";
import getPaldeaPokedex from "../../firebase.config";

const PokemonList = () => {
  const [entries, setEntries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getPokedex = async () => {
    return await getPaldeaPokedex();
  };

  const populateEntryContainer = async () => {
    const pokedex = await getPokedex();
    const arrCopyPokedex = [...pokedex];
    const filteredPokedex = arrCopyPokedex.filter(pokemon => {
      return searchTerm === ''
        ? pokemon
        : pokemon.includes(searchTerm);
    });

    const arrTemp = [];
    filteredPokedex.map((pokemon, i) => {
      arrTemp.push(
        <div
          className={'entry'}
          key={i}
        >
          <span>{i}</span>
          <span>{pokemon}</span>
        </div>
      )
      return null;
    });

    setEntries(arrTemp);
  };

  useEffect(() => {
    populateEntryContainer()
  }, [entries]);

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
        {entries}
      </div>
    </div>
  );
};

export default PokemonList;

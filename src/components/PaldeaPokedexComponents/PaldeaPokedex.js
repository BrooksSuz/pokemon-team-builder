import { useState, useEffect } from "react";
import { getPaldeaPokedex, getPokemonTypes } from "../../firebase-functions";
import PokemonCard from "./PokemonCard";

const PaldeaPokedex = (props) => {
  const {party, setParty} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [pokedex, setPokedex] = useState({ poke: [], types: [] });
  const copyPokedex = Object.assign({}, pokedex);

  // Get pokemon data from backend
  const fillPokedex = async () => {
    const paldeaPokedex = await getPaldeaPokedex();
    const paldeaTypes = await getPokemonTypes();

    copyPokedex.poke = paldeaPokedex;
    copyPokedex.types = paldeaTypes;

    return copyPokedex;
  };

  // Change first letters of names to uppercase
  const formatNames = copyPokedex => {
    const toUpper = copyPokedex.poke.map(poke => {
      return poke.slice().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    });

    copyPokedex.poke = toUpper;
    setPokedex(copyPokedex);
  };

  useEffect(() => {
    fillPokedex().then(res => formatNames(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='pokemon-list container'>
      <h2>Paldea Pokedex</h2>
      <label>
        Search Pokedex:
        <input
          type='text'
          name='search-dex'
          placeholder='Name or Type'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      <div className='entry-container'>
        {
          // First, filter based upon searchTerm value (pokemon name or type)
          pokedex.poke
            .filter((pokemon, i) => {
              return !searchTerm
                ? pokemon
                : pokemon.slice().toLowerCase().includes(searchTerm.slice().toLowerCase()) || pokedex.types[i].slice().toLowerCase().includes(searchTerm.slice().toLowerCase());
            })
            // Then, display the filtered results
            .map((pokemon, index) => (
            <PokemonCard
              pokemon={pokemon}
              party={party}
              setParty={setParty}
              pokedexPokemon={pokedex.poke}
              pokedexTypes={pokedex.types}
              index={index}
              key={index}
            />
          ))
        }
      </div>
    </div>
  );
};

export default PaldeaPokedex;

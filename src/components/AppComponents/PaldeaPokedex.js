import { useState, useEffect } from 'react';
import PokemonCard from '../PaldeaPokedexComponents/PokemonCard';
import { getPaldeaPokedex, getPokemonTypes } from '../../firebase.config';
import '../../styles/PaldeaPokedex.css';

const PaldeaPokedex = (props) => {
  const {party, setParty} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [pokedex, setPokedex] = useState({ poke: [], types: [] });

  // Get pokemon data from backend
  const fillPokedex = async () => {
    const copyPokedex = Object.assign({}, pokedex);
    const paldeaPokedex = await getPaldeaPokedex();
    const paldeaTypes = await getPokemonTypes();

    copyPokedex.poke = paldeaPokedex;
    copyPokedex.types = paldeaTypes;

    setPokedex(copyPokedex);
  };

  // On mount, fill pokedex variable with all Paldea Pokemon names & types
  useEffect(() => {
    fillPokedex();
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
          placeholder='Paldea Awaits...'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      <div className='entry-container'>
        {
          // First, filter based upon searchTerm value (pokemon name or type)
          pokedex.poke
            .filter((pokemon, i) => {
              return searchTerm === ''
                ? pokemon
                : pokemon.includes(searchTerm) || pokedex.types[i].includes(searchTerm);
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

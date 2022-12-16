import { useState } from "react";
import PokemonList from "./PokemonList";
import PokemonTeam from "./PokemonTeam";
import '../../styles/Pokemon.css';

const PokemonContainer = () => {
  const [party, setParty] = useState({
    'poke-1': '',
    'poke-2': '',
    'poke-3': '',
    'poke-4': '',
    'poke-5': '',
    'poke-6': ''
  });

  return (
    <div
      className='pokemon-container'
      data-testid='pokemonContainer'
    >
      <PokemonTeam party={party} setParty={setParty} />
      <PokemonList party={party} setParty={setParty} />
    </div>
  );
};

export default PokemonContainer;

import { useState } from "react";
import PokemonList from "./PokemonList";
import PokemonTeam from "./PokemonTeam";
import '../../styles/Pokemon.css';

const PokemonContainer = () => {
  const [partySlot, setPartySlot] = useState(new Array(6));

  return (
    <div
      className='pokemon-container'
      data-testid='pokemonContainer'
    >
      <PokemonTeam partySlot={partySlot} />
      <PokemonList setPartySlot={setPartySlot} />
    </div>
  );
};

export default PokemonContainer;

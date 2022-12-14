import { useState, useEffect } from "react";
import PartyPokemon from "./PartyPokemon";

const PokemonTeam = (props) => {
  const { partySlot } = props;
  const [party] = useState(
    Array.from(
      { length: 6 }, (_, i) => 
      <PartyPokemon
        num={i + 1}
        partySlot={partySlot}
        key={i} 
      />
    )
  );

  //TODO: when partySlot changes, update party
  /* useEffect(() => {

  }, [partySlot]); */

  return (
    <div
      className='pokemon-team'
      data-testid='pokemonTeam'
    >
      {party}
    </div>
  );
};

export default PokemonTeam;

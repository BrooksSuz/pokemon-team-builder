import { useState } from "react";

const PokemonList = () => {
  const [arrDivs, setArrDivs] = useState(
    Array.from({ length: 400 }, (_, i) => <div key={i} />)
  );

  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      {arrDivs}
    </div>
  );
};

export default PokemonList;

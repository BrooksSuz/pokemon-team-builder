import { useState, useEffect } from "react";
import paldeaPokedex from "../../firebase.config";

const PokemonList = () => {
  const entries = Array.from(
    { length: 10 }, (_, i) => <div className='entry' key={i} />
  );
  const [entryContainers] = useState(Array.from(
    { length: 40 }, (_, i) => <div className='row' key={i}>{entries}</div>
  ));

  useEffect(() => {
    paldeaPokedex();
  }, []);

  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      <h2>This is the Pokedex</h2>
      <div className="row-container">
      {entryContainers}
      </div>
    </div>
  );
};

export default PokemonList;

import { useState, useEffect } from "react";
import getPaldeaPokedex from "../../firebase.config";

const PokemonList = () => {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    getPaldeaPokedex()
    .then(res => {
      const tempEntries = [];
      res.map((pokemon, i) => {
        tempEntries.push(
          <div
            className={`entry entry-${i}`}
            key={i}
          >
            {pokemon}
          </div>
        );
        return null;
      })
      setEntries(tempEntries);
    })
  }, []);

  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      <div className="entry-container">
      {entries}
      </div>
    </div>
  );
};

export default PokemonList;

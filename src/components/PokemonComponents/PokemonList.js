import { useState, useEffect } from "react";
import getPaldeaPokedex from "../../firebase.config";
import Pokemon from "./Pokemon";

const PokemonList = (props) => {
  const { setPartySlot } = props;
  const [pokedex, setPokedex] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  /*
    TODO:
      create a function that maps through the current partySlot array and
      sets the correct pokeSlot (probably the smallest index valued slot)
  */

  useEffect(() => {
    getPaldeaPokedex().then(res => setPokedex(res));
  }, []);


  /*
    TODO:
      create a 'Pokemon' component for each individual pokemon slot and 
      delete the 'PokemonSprites' component
  */
  return (
    <Pokemon
      pokedex={pokedex}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default PokemonList;

import { useRef } from "react";

const PokemonCard = (props) => {
  const {
    pokemon,
    party,
    setParty,
    pokedexPokemon,
    pokedexTypes,
    index
  } = props;
  const spanIndex = useRef();
  const spanPokemon = useRef();
  const spanType = useRef();

  const spanIndexTextContent = pokedexPokemon.findIndex(entry => pokemon === entry) + 1;

  const imgSrc = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${
  pokemon.slice().replace(/\b[A-Z]/g, letter => letter.toLowerCase()).replace(' ', '-')}.png`;
  
  const spanTypeTextContent = pokedexPokemon.map((p, i) => pokemon === p ? pokedexTypes[i] : null);

  // On click, add the pokemon to the party
  const onClickAddPokemon = pokemon => {
    const copyParty = [...party];

    /* 
      Loop through the party. For each party slot, add the respective information required. 
    */
    for (let i = 0; i < copyParty.length; i++) {
      if (!(copyParty[i].pokeSprite && copyParty[i].pokeName && copyParty[i].pokeType)) {
        // Add name, sprite and type to party
        copyParty[i].pokeName = pokemon;
        copyParty[i].pokeSprite = imgSrc;
        copyParty[i].pokeType = spanType.current.textContent;

        // Stop the loop from going any farther
        break;
      }
    }

    setParty(copyParty);
  };

  return (
    <button
      className='entry'
      key={index}
      onClick={e => onClickAddPokemon(e.target.childNodes[2].textContent)}
    >
      <span ref={spanIndex}>{spanIndexTextContent}</span>
      <img
        src={imgSrc}
        alt={`Pokemon number ${spanIndexTextContent}`} 
      />
      <span ref={spanPokemon}>{pokemon}</span>
      <span ref={spanType}>{spanTypeTextContent}</span>
    </button>
  );
};

export default PokemonCard;

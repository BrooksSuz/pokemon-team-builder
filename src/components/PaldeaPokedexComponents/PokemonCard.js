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
  const spanType = useRef();

  // On click, add the pokemon to the party
  const onClickAddPokemon = pokemon => {
    const copyParty = [...party];

    /* 
      Loop through the party. For each party slot, add the respective information required. 
    */
    for (let i = 0; i < copyParty.length; i++) {
      if (copyParty[i].pokeSprite === ''
          && copyParty[i].pokeName === ''
          && copyParty[i].pokeType === '') {

        // Add name to party
        copyParty[i].pokeName = pokemon;

        // Add sprite to party
        copyParty[i].pokeSprite = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${
          pokemon.includes(' ')
            ? pokemon.charAt(0).toLowerCase() + pokemon.slice(1).replace(' ', '-')
            : pokemon.charAt(0).toLowerCase() + pokemon.slice(1)
        }.png`;

        // Add type to party
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
      <span>
        {
          // Add pokedex index
          pokedexPokemon.findIndex(entry => pokemon === entry) + 1
        }
      </span>
      <img
        src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png`}
        alt={`pokedexPokemon entry number ${index + 1}`} 
        height='64'
        width='64'
      />
      <span>
        {
          // Format and add pokemon names
          pokemon.includes('-') && !(index > 391 && index < 396)
            ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
            : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
        }
      </span>
      <span ref={spanType}>
          {
            // Add pokemon types
            pokedexPokemon.map((p, i) => {
              if (pokemon === p) {
                return pokedexTypes[i];
              }
              return null;
            })
          }
      </span>
    </button>
  );
};

export default PokemonCard;

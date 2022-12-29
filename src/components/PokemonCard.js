import { useRef } from "react";

const PokemonCard = (props) => {
  const { party, setParty, poke, pokemon, types, index } = props;

  const spanType = useRef();

  const onClickAddPokemon = pokemon => {
    const copyParty = [...party];

    // Add name & sprite
    for (let i = 0; i < copyParty.length; i++) {
      if (copyParty[i].pokeSprite === ''
          && copyParty[i].pokeName === ''
          && copyParty[i].pokeType === '') {
        copyParty[i].pokeName = pokemon;
        copyParty[i].pokeSprite = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${
          pokemon.includes(' ')
            ? pokemon.charAt(0).toLowerCase() + pokemon.slice(1).replace(' ', '-')
            : pokemon.charAt(0).toLowerCase() + pokemon.slice(1)
        }.png`;
        copyParty[i].pokeType = spanType.current.textContent;
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
          poke.findIndex(entry => {
            return pokemon === entry
              ? true
              : false
          }) + 1
        }
      </span>
      <img
        src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png`}
        alt={`poke entry number ${index + 1}`} 
        height='64'
        width='64'
        style={{ marginBottom: '5px' }}
      />
      <span>
        {
          pokemon.includes('-') && !(index > 391 && index < 396)
            ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
            : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
        }
      </span>
      <br></br>
      <span ref={spanType}>
          {
            poke.map((p, i) => {
              if (pokemon === p) {
                return types[i];
              }
              return null;
            })
          }
        </span>
    </button>
  );
};

export default PokemonCard;

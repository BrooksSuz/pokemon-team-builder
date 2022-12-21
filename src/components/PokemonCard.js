const PokemonCard = (props) => {
  const { party, setParty, pokedex, pokemon, i} = props;

  const onClickAddPokemon = pokemon => {
    const copyParty = [...party];

    // Add name & sprite
    for (let i = 0; i < copyParty.length; i++) {
      if (copyParty[i].pokeSprite === '' && copyParty[i].pokeName === '') {
        copyParty[i].pokeName = pokemon;
        copyParty[i].pokeSprite = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${
          pokemon.includes(' ')
            ? pokemon.charAt(0).toLowerCase() + pokemon.slice(1).replace(' ', '-')
            : pokemon.charAt(0).toLowerCase() + pokemon.slice(1)
        }.png`;
        break;
      }
    }

    setParty(copyParty);
  };

  return (
    <button
      className='entry'
      key={i}
      onClick={e => onClickAddPokemon(e.target.childNodes[2].textContent)}
    >
      <span>
        {
          pokedex.findIndex(entry => {
            return pokemon === entry
              ? true
              : false
          }) + 1
        }
      </span>
      <img
        src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png`}
        alt={`pokedex entry number ${i + 1}`} 
        height='64'
        width='64'
        style={{ marginBottom: '5px' }}
      />
      <span>
        {
          pokemon.includes('-') && !(i > 391 && i < 396)
            ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
            : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
        }
      </span>
    </button>
  );
};

export default PokemonCard;

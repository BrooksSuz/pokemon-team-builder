const PokemonSprites = (props) => {
  const { pokemon, i } = props;

  return (
    <>
      <img
        src={`https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png`}
        alt={`pokedex entry number ${i + 1}`} 
        height='64'
        width='64'
        style={{ marginBottom: '5px' }}
      />
    </>
  );
};

export default PokemonSprites;

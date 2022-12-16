const PokemonTeam = (props) => {
  const { party, setParty } = props;

  return (
    <div
      className='pokemon-team'
      data-testid='pokemonTeam'
    >
      {
        Array.from(
          { length: 6 }, (_, i) => 
          <div
            className={`party-${i + 1}`}
            key={i} 
          >
            {party[`poke-${i + 1}`]}
          </div>
        )
      }
    </div>
  );
};

export default PokemonTeam;

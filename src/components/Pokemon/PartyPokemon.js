const PartyPokemon = (props) => {
  const { num } = props;
  return (
    <div className={`party-${num}`}>Poke-{num}</div>
  );
};

export default PartyPokemon;

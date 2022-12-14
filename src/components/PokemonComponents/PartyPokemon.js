const PartyPokemon = (props) => {
  const { num, partySlot } = props;
  
  return (
    <div className={`party-${num}`}>Poke-{num}</div>
  );
};

export default PartyPokemon;

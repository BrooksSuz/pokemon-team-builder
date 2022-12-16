import PartySlot from "./PartySlot";

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
          <PartySlot
            party={party}
            setParty={setParty}
            i={i}
            key={i}
          />
        )
      }
    </div>
  );
};

export default PokemonTeam;

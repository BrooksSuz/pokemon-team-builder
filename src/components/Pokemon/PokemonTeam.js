import PartyPokemon from "./PartyPokemon";

const PokemonTeam = () => {
  return (
    <div
      className='pokemon-team'
      data-testid='pokemonTeam'
    >
      <PartyPokemon num={1} />
      <PartyPokemon num={2} />
      <PartyPokemon num={3} />
      <PartyPokemon num={4} />
      <PartyPokemon num={5} />
      <PartyPokemon num={6} />
    </div>
  );
};

export default PokemonTeam;

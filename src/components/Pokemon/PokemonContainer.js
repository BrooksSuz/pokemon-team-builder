import PokemonList from "./PokemonList";
import PokemonTeam from "./PokemonTeam";
import '../../styles/Pokemon.css';

const PokemonContainer = () => {
  return (
    <div
      className='pokemon-container'
      data-testid='pokemonContainer'
    >
      <PokemonTeam />
      <PokemonList />
    </div>
  );
};

export default PokemonContainer;

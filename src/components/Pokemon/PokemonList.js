/* const [arrDivs] = useState(
  Array.from(
    { length: 400 }, (_, i) => <div className={`entry-${i + 1}`} key={i} />
  )
); */

const PokemonList = () => {
  const entries = Array.from(
    { length: 10 }, (_, i) => <div className='entry' />
  );
  const entryContainers = Array.from(
    { length: 40 }, (_, i) => <div className='row'>{entries}</div>
  );

  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      <h2>This is the Pokedex</h2>
      <div className="row-container">
      {entryContainers}
      </div>
    </div>
  );
};

export default PokemonList;

const Pokemon = (props) => {
  const { pokedex, searchTerm, setSearchTerm } = props;
  return (
    <div
      className='pokemon-list'
      data-testid='pokemonList'
    >
      <label> Search Pokedex:
        <input
          type='text'
          name='search-dex'
          placeholder='Paldea Awaits...'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      <div
        className='entry-container'
      >
        {
          pokedex
            .filter(pokemon => {
              return searchTerm === ''
                ? pokemon
                : pokemon.includes(searchTerm);
            })
            .map((pokemon, i) => (
            <div
              className='entry'
              key={i}
              onClick={e => console.log(e.target.childNodes[2].textContent)}
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
                  pokemon.includes('-')
                    ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1).replace('-', ' ')
                    : pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
                }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Pokemon;

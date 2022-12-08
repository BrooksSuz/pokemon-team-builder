import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import PokemonContainer from './components/Pokemon/PokemonContainer';
import PokemonTeam from './components/Pokemon/PokemonTeam';
import PokemonList from './components/Pokemon/PokemonList';
import Footer from './components/Footer';

describe('Check if the components are in the document', () => {
  it('Header component rendered?', () => {
    render(<Header />);
    const headerComponent = screen.getByTestId('header');
    expect(headerComponent).toBeInTheDocument();
  });

  it('PokemonContainer rendered?', () => {
    render(<PokemonContainer />);
    const pokemonContainerComponent = screen.getByTestId('pokemonContainer');
    expect(pokemonContainerComponent).toBeInTheDocument();
  });

  it('PokemonTeam rendered?', () => {
    render(<PokemonTeam />);
    const pokemonTeamComponent = screen.getByTestId('pokemonTeam');
    expect(pokemonTeamComponent).toBeInTheDocument();
  });

  it('PokemonList rendered?', () => {
    render(<PokemonList />);
    const pokemonListComponent = screen.getByTestId('pokemonList');
    expect(pokemonListComponent).toBeInTheDocument();
  });

  it('Footer component rendered?', () => {
    render(<Footer />);
    const footerComponent = screen.getByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });
});

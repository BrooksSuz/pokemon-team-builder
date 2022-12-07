import './styles/App.css';
import Header from './components/Header';
import PokemonContainer from './components/Pokemon/PokemonContainer';
import Footer from './components/Footer';

const App = () => {
  return (
    <div
      data-testid='app'
      className='app'
    >
      <Header />
      <PokemonContainer />
      <Footer />
    </div>
  );
};

export default App;

import './styles/App.css';
import Header from './components/Header';
import PokemonContainer from './components/PokemonComponents/PokemonContainer';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <PokemonContainer />
      <Footer />
    </>
  );
};

export default App;

import { useEffect, useRef } from 'react';
import PartySlot from '../PokemonPartyComponents/PartySlot';
import '../../styles/PokemonParty.css';

const PokemonParty = (props) => {
  const {party, setParty, userSignedIn} = props;

  const spanInfo = useRef();
  const btnDeleteAll = useRef();

  const onClickDeleteParty = () => {
    const arr = Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    });
    setParty(arr);
  };

  useEffect(() => {
    const btnStyle = btnDeleteAll.current.style;
    const spanStyle = spanInfo.current.style;
    const test = party.some(slot => {
      for (const key in slot) {
        return slot[key] === '' ? false : true;
      }
      return null;
    });

    if (test || userSignedIn) {
      btnStyle.visibility = 'visible'
      spanStyle.visibility ='hidden'
    } else {
      btnStyle.visibility = 'hidden';
      spanStyle.visibility = 'visible';
    }
  }, [party, userSignedIn]);

  return (
    <div className='pokemon-party container'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', alignSelf: 'flex-start' }}>
        <h2>Pokemon Party</h2>
        <span ref={spanInfo}>Your pokemon will show up here</span>
      </div>
      <button
        style={{ visibility: 'hidden', margin: '20px', position: 'absolute', alignSelf: 'flex-start' }}
        onClick={onClickDeleteParty}
        ref={btnDeleteAll}
      >
        Delete Entire Party
      </button>
      {
        Array.from(
          { length: 6 }, (_, index) => 
          <PartySlot
            party={party}
            setParty={setParty}
            index={index}
            key={index}
          />
        )
      }
    </div>
  );
};

export default PokemonParty;

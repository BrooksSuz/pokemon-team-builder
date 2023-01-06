import { useEffect, useRef } from "react";
import PartySlot from "../PokemonPartyComponents/PartySlot";
import "../../styles/PokemonParty.css";

const PokemonParty = (props) => {
  const { party, setParty } = props;
  const spanInfo = useRef();
  const btnDeleteAll = useRef();

  // On click, replace all six party slots with empty values
  const onClickDeleteParty = () => {
    const arr = Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    });
    setParty(arr);
  };

  // On party or userSignedIn update, show/hide spanInfo/btnDeleteAll respectively
  useEffect(() => {
    const btnStyle = btnDeleteAll.current.style;
    const spanStyle = spanInfo.current.style;
    const isKeyTrue = party.some(slot => Boolean(slot.pokeType));

    if (!isKeyTrue) {
      btnStyle.visibility = 'hidden'
      spanStyle.visibility ='visible'
    } else {
      btnStyle.visibility = 'visible';
      spanStyle.visibility = 'hidden';
    }

  }, [party]);

  return (
    <div className='pokemon-party container'>
      <div className='heading-span'>
        <h2>Pokemon Party</h2>
        <span ref={spanInfo}>Your pokemon will show up here</span>
        <button
          className='btn-delete-all'
          onClick={onClickDeleteParty}
          ref={btnDeleteAll}
        >
          Delete Entire Party
        </button>
      </div>
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

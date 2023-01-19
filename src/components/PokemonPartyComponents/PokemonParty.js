import { useEffect, useRef } from "react";
import PartySlot from "./PartySlot";

const PokemonParty = (props) => {
  const { party, setParty } = props;
  const spanInfo = useRef();
  const btnDeleteAll = useRef();
  const h2PokemonParty = useRef();

  // On click, replace all six party slots with empty values
  const onClickDeleteParty = () => {
    const arr = Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    });
    setParty(arr);
  };

  // On party update, show/hide btnDeleteAll & spanInfo/h2PokemonParty respectively
  useEffect(() => {
    const btnStyle = btnDeleteAll.current.style;
    const spanStyle = spanInfo.current.style;
    const h2Style = h2PokemonParty.current.style;
    const isKeyTrue = party.some(slot => Boolean(slot.pokeType));

    if (!isKeyTrue) {
      btnStyle.visibility = 'hidden';
      spanStyle.visibility = 'visible';
      h2Style.visibility = 'visible';
    } else {
      btnStyle.visibility = 'visible';
      spanStyle.visibility = 'hidden';
      h2Style.visibility = 'hidden';
    }

  }, [party]);

  return (
    <div className='pokemon-party container'>
      <div className='heading-span'>
        <h2 ref={h2PokemonParty}>Pokemon Party</h2>
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

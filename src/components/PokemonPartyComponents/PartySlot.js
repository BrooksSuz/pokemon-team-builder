import { useRef } from "react";

const PartySlot = (props) => {
  const { party, setParty, index } = props;
  const divSlot = useRef();
  const btnDelete = useRef();

  // On click, replace the current pokemon slot with empty values
  const onClickDeleteSlot = () => {
    const copyParty = [...party];

    if (divSlot.current.childNodes[1].textContent) {
      copyParty[index] = { pokeName: '', pokeSprite: '', pokeType: '' };
    }

    setParty(copyParty);
  };

  return (
    <div
      className={`party-${index + 1}`}
      ref={divSlot}
    >
      {
        party[index].pokeName
        && party[index].pokeSprite
        && party[index].pokeType
          ? <>
              <img
                src={`${party[index].pokeSprite}`}
                alt={`Party slot number ${index + 1}`}
              />
              <span>{party[index].pokeName}</span>
              <button 
                onClick={onClickDeleteSlot}
                ref={btnDelete}
              >
                Delete Pokemon
              </button>
            </>
          : null
      }
    </div>
  );
};

export default PartySlot;

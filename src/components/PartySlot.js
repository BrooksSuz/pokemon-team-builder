import { useRef } from "react";

const PartySlot = (props) => {
  const { party, setParty, index } = props;
  const divSlot = useRef();
  const btnDelete = useRef();

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
        party[index].pokeSprite
          ? <img
              src={`${party[index].pokeSprite}`}
              alt={`Party slot number ${index + 1}`}
              height='128px'
              width='128px'
            />
          : null
      }
      <span>{party[index].pokeName}</span>
      {
        party[index].pokeName
          ? <button
              onClick={onClickDeleteSlot}
              ref={btnDelete}
            >
              Delete Pokemon
            </button>
          : null
      }
    </div>
  );
};

export default PartySlot;

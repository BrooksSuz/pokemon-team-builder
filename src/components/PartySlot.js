import { useRef } from "react";

const PartySlot = (props) => {
  const { party, setParty, i } = props;
  const divSlot = useRef();
  const btnDelete = useRef();

  const onClickDeleteSlot = () => {
    const copyParty = [...party];

    if (divSlot.current.childNodes[1].textContent) {
      copyParty[i] = { pokeName: '', pokeSprite: '' };
    }

    setParty(copyParty);
  };

  return (
    <div
      className={`party-${i + 1}`}
      ref={divSlot}
    >
      {
        party[i].pokeSprite
        ? <img
            src={`${party[i].pokeSprite}`}
            alt={`Party slot number ${i + 1}`}
            height='128px'
            width='128px'
          />
        : null
      }
      <span>{party[i].pokeName}</span>
      {
        party[i].pokeName
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

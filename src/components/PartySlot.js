import { useRef } from "react";

const PartySlot = (props) => {
  const { party, setParty, i } = props;
  const divSlot = useRef();

  const handleClick = () => {
    const copyParty = Object.assign({}, party);
    const keys = Object.keys(copyParty);

    if (divSlot.current.childNodes[0].textContent) {
      copyParty[keys[i]] = '';
    }

    setParty(copyParty);
    
  };

  return (
    <div
      className={`party-${i + 1}`}
      ref={divSlot}
    >
      <span>{party[`poke-${i + 1}`]}</span>
      <button onClick={handleClick}>Delete Pokemon</button>
    </div>
  );
};

export default PartySlot;

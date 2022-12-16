import { useEffect, useRef } from "react";

const PartySlot = (props) => {
  const { party, setParty, i } = props;
  const divSlot = useRef();
  const btnDelete = useRef();

  const handleClick = () => {
    const copyParty = Object.assign({}, party);
    const keys = Object.keys(copyParty);

    if (divSlot.current.childNodes[0].textContent) {
      copyParty[keys[i]] = '';
    }

    setParty(copyParty);
  };

  useEffect(() => {
    if (divSlot.current.childNodes[0].textContent) {
      btnDelete.current.style.visibility = '';
    } else if (!divSlot.current.childNodes[0].textContent) {
      btnDelete.current.style.visibility = 'hidden';
    }
  }, [party]);

  return (
    <div
      className={`party-${i + 1}`}
      ref={divSlot}
    >
      <span>{party[`poke-${i + 1}`]}</span>
      <button
        onClick={handleClick}
        style={{ visibility: 'hidden' }}
        ref={btnDelete}
      >Delete Pokemon
      </button>
    </div>
  );
};

export default PartySlot;

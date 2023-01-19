import { useEffect, useRef, useState } from "react";
import { getParties, updateParty } from "../../firebase-functions";

const TeamSelection = (props) => {
  const { party, setParty, userSignedIn } = props;
  const [currentParty, setCurrentParty] = useState('');
  const btn1 = useRef();
  const btn2 = useRef();
  const btn3 = useRef();
  const btnSave = useRef();

  // Update party for current user
  const updatePaldeaParty = () => {
    updateParty(party, currentParty).then(alert('Party updated!'));
  };

  // On userSignedIn update to true, get current user's party 1
  useEffect(() => {
    if (userSignedIn) {
      getParties().then(res => setParty(res.parties['party-1']));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSignedIn]);

  return (
    <div className='team-selection'>
      <button 
        ref={btn1}
        onClick={() => getParties().then(res => setParty(res.parties['party-1'])).then(setCurrentParty('party-1'))}
      >
        Party 1
      </button>
      <button
        ref={btn2}
        onClick={() => getParties().then(res => setParty(res.parties['party-2'])).then(setCurrentParty('party-2'))}
      >
        Party 2
      </button>
      <button
        ref={btn3}
        onClick={() => getParties().then(res => setParty(res.parties['party-3'])).then(setCurrentParty('party-3'))}
      >
        Party 3
      </button>
      <button
        type='button'
        className='button-save'
        onClick={updatePaldeaParty}
        ref={btnSave}
      >
        Save/Update Team
      </button>
    </div>
  );
};

export default TeamSelection;

import { useEffect, useRef } from "react";
import { getParties, updateParty } from "../../firebase-functions";

const FormTeamSelection = (props) => {
  const { party, setParty, userSignedIn } = props;
  const selectTeam = useRef();
  const btnSave = useRef();

  // Update party for current user
  const updatePaldeaParty = () => {
    updateParty(party, selectTeam.current.options[selectTeam.current.options.selectedIndex].value)
      .then(alert('Party updated!'));
  };

  // On userSignedin update to true, get current user's party 1
  useEffect(() => {
    if (userSignedIn) {
      getParties().then(res => setParty(res.parties['party-1']));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSignedIn]);

  return (
    <div className='team-selection'>
      <button onClick={() => getParties().then(res => setParty(res.parties['party-1']))}>
        Party 1
      </button>
      <button onClick={() => getParties().then(res => setParty(res.parties['party-2']))}>
        Party 2
      </button>
      <button onClick={() => getParties().then(res => setParty(res.parties['party-3']))}>
        Party 3
      </button>
    <button
      type='button'
      onClick={updatePaldeaParty}
      ref={btnSave}
    >
      Save/Update Team
    </button>
    </div>
  );
};

export default FormTeamSelection;

import { useEffect, useRef } from "react";
import { getParties, updateParty } from "../../firebase.config";

const FormTeamCreation = (props) => {
  const { party, setParty, userSignedIn } = props;

  // Start ref variables
  const formCreation = useRef();
  const selectTeam = useRef();
  const btnSave = useRef();
  // End ref variables

  const updatePaldeaParty = () => {
    updateParty(party, selectTeam.current.options[selectTeam.current.options.selectedIndex].value);
  };

  useEffect(() => {
    if (userSignedIn) {
      getParties().then(res => setParty(res.parties['party-1']));
      formCreation.current.style.visibility = 'visible';
    } else if (!userSignedIn) {
      formCreation.current.style.visibility = 'hidden';
    }
  }, [userSignedIn])

  return (
    <form
      className='team-creation'
      style={{ position: 'absolute', alignSelf: 'flex-end' }}
      ref={formCreation}
    >
      <select
        name='select-team'
        ref={selectTeam}
      >
        <option
          value={'party-1'}
          onClick={() => getParties().then(res => setParty(res.parties['party-1']))}
        >
          Party 1
        </option>
        <option
          value={'party-2'}
          onClick={() => getParties().then(res => setParty(res.parties['party-2']))}
        >
          Party 2
        </option>
        <option
          value={'party-3'}
          onClick={() => getParties().then(res => setParty(res.parties['party-3']))}
        >
          Party 3
        </option>
      </select>
      <button
        type='button'
        style={{ margin: '1px' }}
        onClick={updatePaldeaParty}
        ref={btnSave}
      >
        Save/Update Team
      </button>
    </form>
  );
};

export default FormTeamCreation;

import { useEffect, useRef } from "react";
import { getParties, updateParty } from "../../firebase.config";

const FormTeamSelection = (props) => {
  const { party, setParty, userSignedIn } = props;

  const formSelection = useRef();
  const selectTeam = useRef();
  const btnSave = useRef();

  const updatePaldeaParty = () => {
    updateParty(party, selectTeam.current.options[selectTeam.current.options.selectedIndex].value)
      .then(alert('Party updated!'));
  };

  useEffect(() => {
    if (userSignedIn) {
      getParties().then(res => setParty(res.parties['party-1']));
    }
  }, [setParty, userSignedIn]);

  return (
    <form
      className='team-selection'
      ref={formSelection}
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
        onClick={updatePaldeaParty}
        ref={btnSave}
      >
        Save/Update Team
      </button>
    </form>
  );
};

export default FormTeamSelection;

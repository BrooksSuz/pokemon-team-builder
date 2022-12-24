import { useRef } from "react";
import { getParties, updateParty } from "../firebase.config";

const FormTeamCreation = (props) => {
  const { party, setParty } = props;

  // Start ref variables
  const selectTeam = useRef();
  const btnUpdate = useRef();
  // End ref variables

  const updatePaldeaParty = () => {
    updateParty(party, selectTeam.current.options[selectTeam.current.options.selectedIndex].value);
  };

  return (
    <form className='team-creation'>
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
        ref={btnUpdate}
      >
        Update Team
      </button>
    </form>
  );
};

export default FormTeamCreation;

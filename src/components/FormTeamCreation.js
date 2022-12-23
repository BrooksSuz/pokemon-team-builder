import { useEffect, useRef } from "react";
import { getParty, updateParty } from "../firebase.config";

const FormTeamCreation = (props) => {
  const { userSignedIn, party } = props;

  // Start ref variables
  const selectTeam = useRef();
  const labelTeam = useRef();
  const inputTeam = useRef();
  const btnSave = useRef();
  // End ref variables

  const onClickShowInput = () => {
    const labelTeamStyle = labelTeam.current.style;

    if (!userSignedIn) {
      alert('To create a team, you need to login.');
      return null;
    }

    if (labelTeamStyle.display === 'none') {
      labelTeamStyle.display = 'block';
    } else {
      labelTeamStyle.display = 'none';
      inputTeam.current.value = '';
    }
  };

  const updatePaldea = () => {
    updateParty(party);
  };

  useEffect(() => {
    if (userSignedIn) {
      getParty();
    }
  }, [userSignedIn]);

  return (
    <form className='team-creation'>
      <button
        type='button'
        onClick={onClickShowInput}
      >
        New Team
      </button>
      <select
        name='select-team'
        ref={selectTeam}
      >
        <option>Default</option>
      </select>
      <button
        type='button'
        onClick={updatePaldea}
        ref={btnSave}
      >
        Save Team
      </button>
      <button
        type='button'
      >Delete Team</button>
      <label
        style={{ display: 'none' }}
        ref={labelTeam}
      >
        Team Name:
        <input
          type='text'
          name='teamName'
          placeholder='Add name'
          ref={inputTeam}
        />
      </label>
    </form>
  );
};

export default FormTeamCreation;

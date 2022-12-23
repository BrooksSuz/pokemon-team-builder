import { useEffect, useRef } from "react";
import { getParties, updateParty } from "../firebase.config";

const FormTeamCreation = (props) => {
  const { userSignedIn, party, setParty } = props;

  // Start ref variables
  const selectTeam = useRef();
  const labelTeam = useRef();
  const inputTeam = useRef();
  const btnCreateTeam = useRef();
  const btnSave = useRef();
  // End ref variables

  const onClickShowInput = () => {
    const labelTeamStyle = labelTeam.current.style;
    const btnCreateStyle = btnCreateTeam.current.style;

    if (!userSignedIn) {
      alert('To create a team, you need to login.');
      return null;
    }

    if (labelTeamStyle.display === 'none' && btnCreateStyle.display === 'none') {
      labelTeamStyle.display = 'block';
      btnCreateStyle.display = 'block';
    } else {
      labelTeamStyle.display = 'none';
      inputTeam.current.value = '';
      btnCreateStyle.display = 'none';
    }
  };

  const getPaldeaParties = async () => {
    const parties = await getParties();
    return parties;
  };

  const updatePaldeaParty = () => {
    updateParty(party);
  };

  const setOptions = async () => {
    const parties = getPaldeaParties();
    const keys = Object.keys(await parties);

    keys.map((key, i) => {
      selectTeam.current.options[selectTeam.current.length] = new Option(`Party ${i + 1}`, key);
      selectTeam.current.options[(selectTeam.current.length) - 1].onclick = () => getPaldeaParties().then(res => setParty(res[`party-${i + 1}`]));
      return null;
    });
  };

  useEffect(() => {
    if (userSignedIn) {
      setOptions();
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
        onClick={updatePaldeaParty}
        ref={btnSave}
      >
        Save Team
      </button>
      <button
        type='button'
        onClick={updateParty}
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
      <button
        style={{ display: 'none' }}
        ref={btnCreateTeam}
      >
        Create Team
      </button>
    </form>
  );
};

export default FormTeamCreation;

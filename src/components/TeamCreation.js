const TeamCreation = () => {
  return (
    <div className='team-creation'>
      <button type='button'>New Team</button>
      <select name='select-team'>
        <option>Default</option>
      </select>
      <button type='button'>Save Team</button>
      <button type='button'>Delete Team</button>
    </div>
  )
};

export default TeamCreation;

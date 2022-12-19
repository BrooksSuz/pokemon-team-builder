import { useState } from "react";

const TeamFolder = () => {
  const [team, setTeam] = useState(null);

  return (
    <>
      <label>
        <select
          name="team-selection"
        >
          <option>Default</option>
        </select>
      </label>
    </>
  );
};

export default TeamFolder;

import { logout } from "../../firebase.config";

const Logout = (props) => {
  const { setParty, user, setUser, setUserSignedIn } = props;

  /* 
    When user logs out, update user, userSignedIn, and party. Also, log them out of the backend.
  */
  const logoutPaldea = () => {
    setUser('');
    setUserSignedIn(false);
    setParty(Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '', pokeType: '' };
    }));
    logout();
  };

  return (
    <div>
      <span>Welcome, {user}</span>
      <button
        type='button'
        onClick={logoutPaldea}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

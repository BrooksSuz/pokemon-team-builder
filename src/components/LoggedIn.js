import { logout } from "../firebase.config";

const LoggedIn = (props) => {
  const { setParty, user, setUser, setUserSignedIn } = props;

  const logoutPaldea = () => {
    setUser('');
    setUserSignedIn(false);
    setParty(Array.from({ length: 6 }, () => {
      return { pokeName: '', pokeSprite: '' };
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

export default LoggedIn;

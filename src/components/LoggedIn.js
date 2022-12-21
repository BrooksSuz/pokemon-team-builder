import { logout } from "../firebase.config";

const LoggedIn = (props) => {
  const { user, setUser, setUserSignedIn } = props;

  const logoutPaldea = () => {
    setUser('');
    setUserSignedIn(false);
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

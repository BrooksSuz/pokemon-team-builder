const LoggedIn = (props) => {
  const { user, logoutPaldea } = props;
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

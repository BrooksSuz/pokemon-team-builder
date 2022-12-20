import { useRef } from "react";
import { loginEmailPassword, logout } from "../firebase.config";

const FormLogin = (props) => {
  const { user, setUser } = props;

  // Start ref variables
  const inputEmail = useRef();
  const inputPassword = useRef();
  // End ref variables

  const loginPaldea = () => loginEmailPassword(inputEmail.current.value, inputPassword.current.value);

  return (
    <form>
      <label>
        Email:
        <input
          type='email'
          name='inputLogin'
          placeholder='Enter an email'
          ref={inputEmail}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          name='inputPass'
          placeholder='Enter your password'
          ref={inputPassword}
        />
      </label>
      <button
        type='button'
        onClick={loginPaldea}
      >
        Sign In
      </button>
      <button
        type='button'
        onClick={logout}
      >
        Logout
      </button>
    </form>
  );
};

export default FormLogin;

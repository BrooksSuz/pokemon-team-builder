import { useRef } from "react";
import { loginEmailPassword, createAccount, logout } from "../firebase.config";

const FormLogin = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const createPaldeaAccount = () => createAccount(inputEmail.current.value, inputPassword.current.value);

  return (
    <form style={{ alignSelf: 'flex-end' }}>
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
        onClick={loginEmailPassword}
      >
        Sign In
      </button>
      <button
        type='button'
        onClick={createPaldeaAccount}
      >
        Create Account
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

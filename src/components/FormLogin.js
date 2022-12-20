import { useRef } from "react";
import { loginEmailPassword } from "../firebase.config";

const FormLogin = (props) => {
  const { setUser, formLoginDisplay } = props;

  // Start ref variables
  const inputEmail = useRef();
  const inputPassword = useRef();
  // End ref variables

  const loginPaldea = () => loginEmailPassword(inputEmail.current.value, inputPassword.current.value).then(res => {
    try {
      setUser(res);
    } catch(error) {
      console.log(error);
    }
  });

  return (
    <form style={{ display: `${formLoginDisplay}` }}>
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
    </form>
  );
};

export default FormLogin;

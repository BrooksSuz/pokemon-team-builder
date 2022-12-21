import { useRef, forwardRef } from "react";
import { loginEmailPassword, monitorAuthState } from "../firebase.config";

const FormLogin = forwardRef((props, ref) => {
  const { setUser } = props;

  // Start ref variables
  const inputEmail = useRef();
  const inputPassword = useRef();
  // End ref variables

  const loginPaldea = () => loginEmailPassword(inputEmail.current.value, inputPassword.current.value).then(res => {
    const authStatus = monitorAuthState();
    if (authStatus !== null) {
      setUser(res);
    }
  });

  return (
    <form style={{ display: 'block' }} ref={ref}>
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
});

export default FormLogin;

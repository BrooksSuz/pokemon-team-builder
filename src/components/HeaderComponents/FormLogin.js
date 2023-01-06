import { useRef, forwardRef } from "react";
import { loginEmailPassword } from "../../firebase-functions";

const FormLogin = forwardRef((props, ref) => {
  const { setUser, setUserSignedIn } = props;
  const inputEmail = useRef();
  const inputPassword = useRef();

  // Log in an existing user
  const loginPaldea = () => loginEmailPassword(inputEmail.current.value, inputPassword.current.value).then(res => {
    if (res === null) {
      alert('Could not sign in');
      return null;
    }

    setUser(res);
    setUserSignedIn(true);
  });

  return (
    <form
      style={{ display: 'block' }}
      ref={ref}
    >
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

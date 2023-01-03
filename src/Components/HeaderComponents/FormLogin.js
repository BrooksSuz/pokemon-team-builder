import { useRef, forwardRef } from "react";
import { loginEmailPassword } from "../../firebase.config";

const FormLogin = forwardRef((props, ref) => {
  const { setUser, setUserSignedIn } = props;

  const inputEmail = useRef();
  const inputPassword = useRef();
  const spanError = useRef();

  const loginPaldea = () => loginEmailPassword(inputEmail.current.value, inputPassword.current.value).then(res => {
    const spanStyle = spanError.current.style;

    if (res === null) {
      spanStyle.display = 'inline';
      return null;
    }

    if (spanStyle.display === 'inline') {
      spanStyle.display = 'none';
    }

    setUser(res);
    setUserSignedIn(true);
  });

  return (
    <form
      style={{ display: 'block' }}
      ref={ref}
    >
      <span
        style={{ display: 'none' }}
        ref={spanError}
      >
          Something went wrong, sorry!</span>
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

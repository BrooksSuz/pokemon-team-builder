import { useRef, forwardRef } from "react";
import { createAccount } from "../../firebase.config";

const FormCreateAccount = forwardRef((props, ref) => {
  const { setUser, setUserSignedIn } = props;
  const inputEmail = useRef();
  const inputPassword = useRef();
  const spanError = useRef();

  const createPaldeaAccount = () => createAccount(inputEmail.current.value, inputPassword.current.value).then(res => {
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
      style={{ display: 'none' }}
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
          placeholder='Enter an email'
          ref={inputEmail}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          placeholder='Enter a password'
          ref={inputPassword}
        />
      </label>
      <button
        type='button'
        onClick={createPaldeaAccount}
      >
        Create Account
      </button>
    </form>
  );
});

export default FormCreateAccount;

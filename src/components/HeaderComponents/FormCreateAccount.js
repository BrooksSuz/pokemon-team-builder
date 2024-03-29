import { useRef, forwardRef } from "react";
import { createAccount } from "../../firebase-functions";

const FormCreateAccount = forwardRef((props, ref) => {
  const { setUser, setUserSignedIn } = props;
  const inputEmail = useRef();
  const inputPassword = useRef();

  // Create a new user account and sign them in
  const createPaldeaAccount = () => createAccount(inputEmail.current.value, inputPassword.current.value).then(res => {
    if (res === null) {
      alert('Could not create account');
      return;
    }

    setUser(res);
    setUserSignedIn(true);
  });

  return (
    <form
      style={{ display: 'none' }}
      ref={ref}
    >
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

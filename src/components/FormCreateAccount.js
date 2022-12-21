import { useRef, forwardRef } from "react";
import { createAccount } from "../firebase.config";

const FormCreateAccount = forwardRef((props, ref) => {
  const { setUser, formCreateDisplay } = props;
  const inputEmail = useRef();
  const inputPassword = useRef();

  const createPaldeaAccount = () => createAccount(inputEmail.current.value, inputPassword.current.value).then(res => {
    try {
      setUser(res);
    } catch(error) {
      console.log(error);
    }
  });

  return (
    <form style={{ display: 'none' }} ref={ref}>
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

import { useRef } from "react";
import { createAccount } from "../firebase.config";

const FormCreateAccount = (props) => {
  const { user, setUser } = props;
  const inputEmail = useRef();
  const inputPassword = useRef();

  const createPaldeaAccount = () => setUser(createAccount(inputEmail.current.value, inputPassword.current.value));
  return (
    <form>
      <label>
        Email:
        <input
          type='email'
          ref={inputEmail}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
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
};

export default FormCreateAccount;

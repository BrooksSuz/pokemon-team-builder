import { useRef } from "react";
import { createAccount } from "../firebase.config";

const FormCreateAccount = (props) => {
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
    <form style={{ display: `${formCreateDisplay}` }}>
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

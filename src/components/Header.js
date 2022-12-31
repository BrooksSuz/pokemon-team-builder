import { useEffect, useRef } from "react";
import LoggedIn from "./LoggedIn";
import FormTeamCreation from "./FormTeamCreation";
import FormLogin from "./FormLogin";
import FormCreateAccount from "./FormCreateAccount";

const Header = (props) => {
  const {party, setParty, user, setUser, userSignedIn, setUserSignedIn} = props;

  const divFormContainer = useRef();
  const formLogin = useRef();
  const formCreate = useRef();
  const btnHideComponents = useRef();

  const onClickDisplayLogin = () => {
    const divStyle = divFormContainer.current.style;

    if (divStyle.display === 'none') {
      divStyle.display = 'block';
    } else if (divStyle.display === 'block') {
      divStyle.display = 'none';
    }
  };

  const onClickChangeDisplayForms = () => {
    const loginStyle = formLogin.current.style;
    const createStyle = formCreate.current.style;
    const btnCurrent = btnHideComponents.current;

    if (loginStyle.display === 'block' && createStyle.display === 'none') {
      loginStyle.display = 'none';
      createStyle.display ='block';
      btnCurrent.textContent = 'Whoopsie, take me back';
    } else {
      loginStyle.display = 'block';
      createStyle.display = 'none';
      btnCurrent.textContent = 'Need an account?';
    }
  };

  useEffect(() => {
    const divStyle = divFormContainer.current.style;

    if (userSignedIn) {
      divStyle.display = 'none';
    }
  }, [userSignedIn]);

  return (
    <header className='container'>
      <h1>Pokemon Scarlet & Violet Team Builder</h1>
      {
        userSignedIn
          ? <LoggedIn
              setParty={setParty}
              user={user}
              setUser={setUser}
              setUserSignedIn={setUserSignedIn}
            />
          : <button onClick={onClickDisplayLogin}>Show/Hide Login Form</button>
      }
      {/* TODO: Add this to the logic above instead of relying on inner logic to show/hide */}
      <FormTeamCreation
        party={party}
        setParty={setParty}
        userSignedIn={userSignedIn}
      />
      <div
        className='container form-container'
        style={{ display: 'none' }}
        ref={divFormContainer}
      >
        <FormLogin
          setUser={setUser}
          setUserSignedIn={setUserSignedIn}
          ref={formLogin}
        />
        <FormCreateAccount
          setUser={setUser}
          setUserSignedIn={setUserSignedIn}
          ref={formCreate}
        />
        <button
          type='button'
          onClick={onClickChangeDisplayForms}
          ref={btnHideComponents}
        >
          Need an account?
        </button>
      </div>
    </header>
  );
};

export default Header;

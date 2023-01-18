import { useEffect, useRef } from "react";
import Logout from "../HeaderComponents/Logout";
import FormTeamSelection from "../HeaderComponents/FormTeamSelection";
import FormLogin from "../HeaderComponents/FormLogin";
import FormCreateAccount from "../HeaderComponents/FormCreateAccount";

const Header = (props) => {
  const {
    party,
    setParty,
    user,
    setUser,
    userSignedIn,
    setUserSignedIn
  } = props;

  const divFormContainer = useRef();
  const formLogin = useRef();
  const formCreate = useRef();
  const btnHideComponents = useRef();

  // On click, show/hide the login form
  const onClickDisplayLogin = () => {
    const divStyle = divFormContainer.current.style;

    if (divStyle.display === 'none') {
      divStyle.display = 'block';
    } else if (divStyle.display === 'block') {
      divStyle.display = 'none';
    }
  };

  // On click, switch between the login form and the create an account form
  const onClickChangeDisplayForms = () => {
    const loginStyle = formLogin.current.style;
    const createStyle = formCreate.current.style;
    const btnCurrent = btnHideComponents.current;

    if (loginStyle.display === 'block' && createStyle.display === 'none') {
      loginStyle.display = 'none';
      createStyle.display ='block';
      btnCurrent.textContent = 'Need to login?';
    } else {
      loginStyle.display = 'block';
      createStyle.display = 'none';
      btnCurrent.textContent = 'Need an account?';
    }
  };

  // On userSignedIn update, remove login/create account form
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
        // When signed in, display logout button and team selection form
        userSignedIn
          ? <div className='account-container'>
              <FormTeamSelection
                party={party}
                setParty={setParty}
                userSignedIn={userSignedIn}
              />
              <Logout
                setParty={setParty}
                user={user}
                setUser={setUser}
                setUserSignedIn={setUserSignedIn}
              />
            </div>
            // While not signed in, display sign in button
          : <button onClick={onClickDisplayLogin}>Show/Hide Login Form</button>
      }
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

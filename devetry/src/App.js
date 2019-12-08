import React, {useState, useEffect} from 'react';
import './App.scss';
import Loading from "./components/Loading"
import {getStatus} from "./api/accountAPI"
import Login from "./components/Login"
import Logout from "./components/Logout"
import CreateAccount from "./components/CreateAccount"

function App() {
  const [loggedIn, setLoggedIn] = useState('checking');

  // check whether user is logged in already
  useEffect(() => {
    (async () => {
      let res = await getStatus();
      setLoggedIn(res ? res : 'invalid');
    })();
  }, []);

  if (loggedIn === 'checking') return <div className="App LoadingApp"><Loading /></div>;

  return (
    <div className="App">
      {loggedIn === 'invalid' ?
        <div className="account-components">
          <Login/>
          <CreateAccount/>
        </div>
        :
        <h3>
          <span className="is-italic is-size-6">logged in as</span> {loggedIn.user.name}
        </h3>
      }
      <Logout/>
    </div>
  );
}

export default App;

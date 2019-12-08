import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.scss';
import Loading from "./components/Loading"
import {getStatus} from "./api/accountAPI"
import ModalLogin from "./components/ModalLogin"
import Logout from "./components/Logout"

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
        <ModalLogin />
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

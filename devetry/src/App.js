import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.scss';
import Loading from "./components/Loading"
import { getStatus } from "./api/accountAPI"
import Header from './components/Header'
import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'

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
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <hr />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/users" component={UserPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/post" component={PostPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

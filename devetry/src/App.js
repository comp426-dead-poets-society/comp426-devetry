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
import SubmitPage from './pages/SubmitPage'

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
        <Route exact path="/" render={(props) => <MainPage {...props} loggedIn={loggedIn}/>} />
        <Route path="/user" render={(props) => <UserPage {...props} loggedIn={loggedIn}/>} />
        <Route path="/search" render={(props) => <SearchPage {...props} loggedIn={loggedIn}/>} />
        <Route path="/post/:id" render={(props) => <PostPage {...props} loggedIn={loggedIn}/>} />
        <Route path="/submit" render={(props) => <SubmitPage {...props} loggedIn={loggedIn}/>} />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import {login} from "../api/accountAPI";

function Login() {
  return (
    <div className="box has-background-white content">
      <h3 className="has-text-dark">Login</h3>
      <form onSubmit={async event => {
        event.preventDefault();
        const name = event.target.username.value;
        const pass = event.target.password.value;
        if (await login({name, pass})) {
          console.log('logged in');
          window.location.reload();
        } else {
          console.log('failed')
        }

      }}>
        <div className="field">
          <input className="input" placeholder="Username" type="text" name="username"/>
        </div>
        <div className="field">
          <input id="password" className="input" placeholder="Password" type="password" name="password"/>
        </div>
        <input className="button is-primary" type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;


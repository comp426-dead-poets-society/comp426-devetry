import React from 'react';
import {createAccount} from "../api/accountAPI";

function CreateAccount() {
  return (
    <div className="box has-background-white content">
      <h3 className="has-text-dark">Create Account</h3>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const pass = e.target.pass.value;
        await createAccount({name, pass});
      }}>
        <div className="field">
          <input className="input" placeholder="Username" type="text" name="name"/>
        </div>
        <div className="field">
          <input className="input" placeholder="Password" type="password" name="pass"/>
        </div>
        <input className="button is-primary" type="submit" value={"Create"}/>
      </form>
    </div>
  );
}

export default CreateAccount;

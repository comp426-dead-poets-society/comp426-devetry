import React, {useState} from 'react';
import { createAccount } from "../api/accountAPI";

function CreateAccount() {
  return (
    <div className="box has-background-white content">
      <h3 className="has-text-dark">Create Account</h3>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const pass = e.target.pass.value;
        let color;
        switch(e.target.color.selectedIndex) {
          case 0:
            color = "#BA55D3"
            break;
          case 1:
            color = "#B0C4DE";
            break;
          case 2:
            color = "#778899"
            break;
          case 4:
            color = "#FF8C00"
            break;
          case 3:
            color = "#F08080"
            break;          
        }
        let data = { "name":name, "pass":pass, "data":{"color":color} }
        await createAccount(data);
        window.location.reload();
      }}>
        <div className="field">
          <input className="input" placeholder="Username" type="text" name="name" />
        </div>
        <div className="field">
          <input className="input" placeholder="Password" type="password" name="pass" />
        </div>
        <div className="field">
          <label class="label">Preferred Color</label>
          <div class="control">
            <div class="select">
              <select name="color">
                <option value="1">Purple</option>
                <option value="2">Blue</option>
                <option value="3">Gray</option>
                <option value="4">Pink</option>
                <option value="5">Orange</option>
              </select>
            </div>
          </div>
        </div>
        <input className="button is-primary" type="submit" value={"Create"} />
      </form>
    </div>
  );
}

export default CreateAccount;

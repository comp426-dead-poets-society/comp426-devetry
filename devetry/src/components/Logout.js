import React from 'react';
import {setToken} from "../config/Token";

function Logout() {
  return (
    <button className="button is-danger"
            onClick={() => {
              setToken('');
              window.location.reload();
            }}>Logout</button>
  );
}

export default Logout;
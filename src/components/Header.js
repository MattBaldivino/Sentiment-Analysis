import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useToken from './useToken.js';

function Header(props) {
  const { token, removeToken, setToken } = useToken();
  const navigate = useNavigate();

  function logMeOut() {
    axios({
      method: "POST",
      url: "/logout",
    })
    .then((response) => {
       removeToken(); // Use removeToken function to handle token removal
       navigate('/'); // Redirect to home page or sign-in page
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  function logMeIn() {
    navigate('/'); // Redirect to sign-in page
  }

  return (
    <header className="App-header d-flex justify-content-end p-3" style={{ 
      position: 'absolute', 
      top: 0, 
      right: 0, 
      backgroundColor: 'transparent', 
      zIndex: 10000, 
      width: '100%', 
      pointerEvents: 'all'
    }}>
      {!token ? (
        <button onClick={logMeIn} className="login-button rounded-pill credentials">Login</button>
      ) : (
        <button onClick={logMeOut} className="login-button rounded-pill credentials">Logout</button>
      )}
    </header>
  );
}

export default Header;

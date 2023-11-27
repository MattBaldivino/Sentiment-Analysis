import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import LoginScreen from "./LoginScreen.jsx";
import RegisterScreen from './RegisterScreen.jsx';
import Login from "./Login.js";
import Sentiment from './Sentiment';
import Header from './Header'
import useToken from './useToken'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  /*Router basically allows us to navigate between components. Without it, the url would change but the 
  corresponding components would not render*/

  const { token, removeToken, setToken } = useToken();

  return (
    <div className="App">
      {/* Set up React Router for routing */}
      <Router>
        <div className="App">
          {/* Display the Header component and pass it a "token" prop with the value "removeToken" */}
          <Routes>
            <Route 
                  exact
                  path="/"
                  element={<LoginScreen setToken={setToken}/>}
            ></Route>
            <Route
                  exact
                  path="/Sentiment"
                  // Render the Sentiment component and pass it "token" and "setToken" props
                  element={<Sentiment token={token} setToken={setToken} />}
             ></Route>
          </Routes>

        </div>
      </Router>
    </div>
  );
   
}

export default App;
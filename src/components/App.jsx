import React from 'react';
import LoginScreen from "./LoginScreen.jsx";
import RegisterScreen from './RegisterScreen.jsx';
import Sentiment from './Sentiment.jsx';
import useToken from './useToken.js'
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
        <div>
          {/* Display the Header component and pass it a "token" prop with the value "removeToken" */}
          <Routes>
            <Route 
                  exact
                  path="/"
                  element={<LoginScreen setToken={setToken}/>}
            ></Route>
            <Route
                  exact
                  path="/Register"
                  // Render the Sentiment component and pass it "token" and "setToken" props
                  element={<RegisterScreen />}
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
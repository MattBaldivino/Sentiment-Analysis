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
          {/* Conditional rendering based on the token */}
          {!token && token !== "" && token !== undefined ? 
            <LoginScreen setToken={setToken} />
            :
            <>
              {/* Display the Header component and pass it a "token" prop with the value "removeToken" */}
              {/* <Header removeToken={setToken} /> */}
              {/* Define routes */}
              <Routes>
                <Route exact path="/Sentiment" element={<Sentiment token={token} setToken={setToken}/>}></Route>
                {/* Other authenticated routes can go here */}
              </Routes>
            </>
          }
  
          {/* Define routes that are always accessible */}
          <Routes>
            <Route exact path="/" element={<LoginScreen setToken={setToken}/>} ></Route>
            <Route exact path="/Register" element={<RegisterScreen />} ></Route>
            {/* Other unauthenticated routes can go here */}
          </Routes>
        </div>
      </Router>
    </div>
  );
     
}

export default App;
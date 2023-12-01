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
        <Routes>
          {/* Redirect to login if not authenticated */}
          {!token && <Route path="*" element={<Navigate replace to="/" />} />}

          {/* Login and Register Routes */}
          <Route exact path="/" element={<LoginScreen setToken={setToken} />} />
          <Route exact path="/Register" element={<RegisterScreen />} />

          {/* Redirect to a default authenticated route */}
          {token && <Route path="/" element={<Navigate replace to="/Sentiment" />} />}

          {/* Authenticated Route */}
          <Route exact path="/Sentiment" element={<Sentiment token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
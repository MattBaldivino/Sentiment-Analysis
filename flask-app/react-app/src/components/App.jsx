import React, { useEffect } from 'react';
import axios from 'axios';
import LoginScreen from './LoginScreen.jsx';
import Sentiment from './Sentiment';
import Header from './Header';
import useToken from './useToken'; // Import removeToken
import removeToken from './useToken.js';
import {
  BrowserRouter as Router,
  Navigate, 
  Routes,
  Route,
  useNavigate, // Import useNavigate
} from 'react-router-dom';


function App() {
  const { token, setToken } = useToken();

  // No need for a useEffect for redirection
  // Check if the token is set, and redirect accordingly
  const redirectComponent = token ? <Navigate to="/Sentiment" /> : null;

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/token', { email, password });
      const accessToken = response.data.access_token;

      // Set the token
      setToken(accessToken);
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Router>
        <div className="App">
          <Header token={removeToken} />

          {/* Include the redirection component */}
          {redirectComponent}

          <Routes>
            <Route
              exact
              path="/Sentiment"
              element={<Sentiment token={token} setToken={setToken} />}
            />
            <Route
              path="/"
              element={
                <LoginScreen
                  setToken={(email, password) => handleLogin(email, password)}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
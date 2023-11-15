import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import LoginScreen from "./LoginScreen";
import RegisterScreen from './RegisterScreen';
import Sentiment from './Sentiment';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  /*Router basically allows us to navigate between components. Without it, the url would change but the 
  corresponding components would not render*/
   return (
     <div className="App">
       <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<LoginScreen />}
          />
          <Route
            exact
            path="/RegisterScreen"
            element={<RegisterScreen />}
          />
          <Route
            exact
            path="/Sentiment"
            element={<Sentiment />}
          />
        </Routes>
       </Router>
       
     </div>
   );
   
}

export default App;


//move the following into the top of the App() function to make API requests

/*const [getMessage, setGetMessage] = useState({});

   useEffect(()=>{
     axios.get('http://localhost:5000/flask/hello').then(response => {
       console.log("SUCCESS", response);
       setGetMessage(response);
     }).catch(error => {
       console.log(error);
     })
 
   }, [])*/

//can move the following into App div to display API messages

{/* <header className="App-header">
         <div>{getMessage.status === 200 ? 
           <h3>{getMessage.data.message}</h3>
           :
           <h3>LOADING</h3>}</div>
       </header> */}
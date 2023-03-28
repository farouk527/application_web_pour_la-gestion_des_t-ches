import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import AuthenticationPage from './AuthenticationForm';
import AuthContext from './AuthContext';
import SignupPage from './Sinup';
import Show from './Show';
import Navbar from './Navbar';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const  [token,Settoken]=useState("");


  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');

    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
    
  }, []);


  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated , token,Settoken}}>
        <Router>
          {isAuthenticated &&
        <Navbar/>
      }
         <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route
              path="/welcome"
              element={isAuthenticated ? <Welcome /> : <Navigate to="/" />}
            />
            <Route
              path="/tasks"
              element={isAuthenticated ? <Show /> : <Navigate to="/" />}
            />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

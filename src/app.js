import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.get("http://localhost:5001/api/auth/verify", {
          headers: { Authorization: token },
        });
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <div>{isAuthenticated ? <h1>Welcome!</h1> : <Login />}</div>;
};

export default App;

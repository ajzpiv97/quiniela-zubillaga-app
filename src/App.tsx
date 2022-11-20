import * as React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import { Box, Typography } from "@mui/material";
import { ReactComponent as GiSoccerKick } from "./pulic/icon.svg";
import ProtectedRoute from "./components/ProtectedRoute";
import { parseJwt } from "./utils/authenticateUser";
import AuthVerify from "./components/AuthVerify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // React.useEffect(() => {
  //   const parsed_token = parseJwt(localStorage.getItem("token"));
  //   if (parsed_token === null || parsed_token.expiration_date < Date.now()) {
  //     localStorage.removeItem("token");
  //     setIsLoggedIn(false);
  //   } else {
  //     setIsLoggedIn(true);
  //   }
  // }, [pathname]);
  const logIn = () => {
    setIsLoggedIn(true);
    console.log("Inside props login", isLoggedIn);
  };
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    console.log("inside  props logout", isLoggedIn);
  };

  return (
    <div className="App">
      <AuthVerify logOut={logOut} logIn={logIn} />
      <Box mt={4}>
        <Typography component="h1" variant="h5">
          Quiniela Zubillaga Mundial 2022
        </Typography>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                authenticated={isLoggedIn}
                redirectPath={"/login"}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;

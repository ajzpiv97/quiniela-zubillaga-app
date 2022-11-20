import * as React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { isUserAuthenticated } from "./store/actions";
function App() {
  const isLoggedIn = useAppSelector((state) => state.authReducer["isLoggedIn"]);

  let location = useLocation();
  let dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(isUserAuthenticated());
  }, [dispatch, location]);

  return (
    <div className="App">
      {isLoggedIn === null ? (
        <Box sx={{ textAlign: "center" }} mt={50}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;

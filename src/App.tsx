import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./views/Login";
import SignUp from "./views/SignUp";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box mt={4}>
        <Typography component="h1" variant="h5">
          Quiniela Zubillaga Mundial 2022
        </Typography>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;

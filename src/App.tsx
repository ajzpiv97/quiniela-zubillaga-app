import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import { Box, Typography } from "@mui/material";
import BasicTable from "./views/ScoreTable";
import menuBar from "./components/menubar";
import Container from "@mui/material/Container";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';   
import { ReactComponent as GiSoccerKick } from './pulic/icon.svg'
const pages = ['Tabla', 'Predicciones'];

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
          <Route path="/Tabla" element={<Dashboard />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;

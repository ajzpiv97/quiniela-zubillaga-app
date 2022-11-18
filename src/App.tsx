import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./views/Login";
import SignUp from "./views/SignUp";
import BasicTable from "./views/Table"

function App() {
  return (
    <div className="App">
      <h1>Quiniela Zubillaga Mundial 2022</h1>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/table" element={<BasicTable/>} />
      </Routes>
    </div>
  );
}

export default App;

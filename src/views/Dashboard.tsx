import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';   
import MenuBar from "../components/menubar";
import ScoreTable from "./ScoreTable";

 const Dashboard = () => {
    return(
        <ScoreTable/>
        //MenuBar pages={['Predictions', 'Tabla']}/>

    )
}
export default Dashboard
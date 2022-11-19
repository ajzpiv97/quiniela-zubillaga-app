import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';   
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel';

interface menuBarI {
    pages: Array<string>
}
const theme = createTheme();

const MenuBar = ({pages}:menuBarI) => (
    <Container component="main" maxWidth="xl">
    </Container>
  );
export default MenuBar;

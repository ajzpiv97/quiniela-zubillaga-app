import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';   
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from "react-router-dom";
import { getRadioUtilityClass } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import menuBar from "../components/menubar";



const theme = createTheme();

interface rowDataI {
  name: string;
  lastName: string;
  position: number;
  points: number | string;
}

const pages = ['Tabla', 'Predicciones'];
const settings = [];




const fetchTableEntries = async (): Promise<Response> => {
  return await fetch(
    "https://quiniela-zubillaga-api.herokuapp.com/api/user-actions/get-ranking",
    {
      method: "GET",
      headers: {
        "Auth-token": localStorage.getItem("token")!,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};


export default function BasicTable() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<Array<rowDataI>>([]);

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setRowData(data.data);
      });
  }, []);

  return isLoading ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xl">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.position}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.points === "" ? 0 : row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </ThemeProvider>
  );
}

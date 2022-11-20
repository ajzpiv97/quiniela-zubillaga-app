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
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "../hooks/hooks";
import { isUserAuthenticated } from "../store/actions";

const theme = createTheme();

interface rowDataI {
  name: string;
  lastName: string;
  position: number;
  points: number | string;
}

const fetchTableEntries = async (): Promise<Response> => {
  return await fetch("http://127.0.0.1:8000/api/user-actions/get-ranking", {
    method: "GET",
    headers: {
      "Auth-token": localStorage.getItem("token")!,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const ScoreTable = () => {
  let dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<Array<rowDataI>>([]);

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((response) => {
        if (response.code !== undefined && response.code > 300) {
          dispatch(isUserAuthenticated(false));
          // throw new Error(response["description"]);
        } else {
          setIsLoading(false);
          setRowData(response.data);
        }
      });
  }, [dispatch]);

  return isLoading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
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
};
export default ScoreTable;

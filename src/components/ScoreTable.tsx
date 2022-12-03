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
import { apiCall, signOut } from "../utils/authenticateUser";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const theme = createTheme();

interface rowDataI {
  name: string;
  lastName: string;
  position: number;
  points: number | string;
}

const ScoreTable = () => {
  let dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<Array<rowDataI>>([]);

  React.useEffect(() => {
    apiCall({
      domain: "https://quiniela-zubillaga-api.herokuapp.com",
      endpoint: "api/user-actions/get-ranking",
      method: "get",
      headers: {
        "Auth-token": localStorage.getItem("token")!,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 200) {
          setRowData(response.data["data"]);
          setIsLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        const { description } = error?.response?.data as {
          code: number;
          description: string;
        };
        return signOut({ dispatch, status: description, navigate });
      });
  }, [dispatch, navigate]);

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ display: "grid" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Posición</TableCell>
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

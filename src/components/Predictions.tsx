import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

const theme = createTheme();

interface rowDataI {
  ActualScore: string;
  TeamA: string;
  TeamB: string;
  UserPredictedScore: number | string;
}


const fetchTableEntries = async (): Promise<Response> => {
  return await fetch(
    "https://quiniela-zubillaga-api.herokuapp.com/api/user-actions/get-user-predictions",
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


const Preditcions  = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<Array<rowDataI>>([]);

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((data) => {
        console.log("This is Pred data")
        console.log(data)
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
        <Box  >
        {rowData.map((row, index) => (
            <Box m={23} pt={0.2} sx={{ display: 'flex', alignItems: 'center'}}>
            <h2>{ row.TeamA} </h2>
            <TextField id="outlined-basic" variant="outlined"  style={{width: 50}}  />
            <h2>  VS  </h2>
            <h2> {row.TeamB} </h2>
            <TextField id="outlined-basic"  variant="outlined" style={{width: 50}}/>
            </Box>
          ))}
        </Box>
    
    </Container>
    </ThemeProvider>
  );
}
export default Preditcions;

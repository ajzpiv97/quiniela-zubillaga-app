import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { string } from "yup";

const theme = createTheme();

// interface GroupDataI {
//   [key: string]: Array<gameDataI>;
// }

interface groupDataI {
  [key: string]: Array<gameDataI>;
}
interface gameDataI {
  ActualScore: string;
  TeamA: string;
  TeamB: string;
  UserPredictedScore: number | string;
}

const fetchTableEntries = async (): Promise<Response> => {
  return await fetch(
    "http://127.0.0.1:8000/api/user-actions/get-user-predictions",
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

const Predictions = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<groupDataI>({});

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((data) => {
        console.log("This is Pred data");
        console.log(data);
        setIsLoading(false);
        setRowData(data.data);
      });
  }, []);

  return isLoading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        {Object.entries(rowData).map(([group, group_data], index) => (
          <Box
            pt={0.2}
            pr={0.1}
            pl={0.1}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
            key={index}
          >
            <h1>{group}</h1>
            {group_data.map((matches, index) => (
              <Box
                pb={0.01}
                sx={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <h2>{matches.TeamA} </h2>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                />
                <h2> {matches.TeamB} </h2>
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
};
export default Predictions;

/* {rowData.map((row, index) => (
          <div>
            {Object.entries(row).map(([key, _], index) => (
              <Box
                m={23}
                pt={0.2}
                sx={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <h2>{key} </h2>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                />
                <h2> {row.TeamB} </h2>
              </Box>
            ))}
          </div>
        ))} */

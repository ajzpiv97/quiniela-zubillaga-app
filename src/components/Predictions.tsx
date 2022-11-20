import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { string } from "yup";
import { isUserAuthenticated } from "../store/actions";
import { useAppDispatch } from "../hooks/hooks";
import { useFormik } from "formik";
import { Typography } from "@mui/material";

const theme = createTheme();

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
  let dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      predictionValues: [[]],
    },
    onSubmit: (values) => {
      console.log(values, formik.values);
    },
  });

  console.log(formik.values);

  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<groupDataI>({});

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((response) => {
        if (response.code !== undefined && response.code > 300) {
          dispatch(isUserAuthenticated());
          throw new Error("Sessión expiró!");
        } else {
          setIsLoading(false);
          setRowData(response.data);
        }
      })
      .catch((error) => window.alert(error));
  }, [dispatch]);

  // React.useEffect(() => {
  //   if (rowData) {
  //     let rows =
  //     Object.entries(rowData).map((array, bigIndex) => {
  //       if
  //       array.push(())
  //     });
  //     // formik.values.predictionValues;
  //   }
  // }, [rowData]);

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
        {Object.entries(rowData).map(([group, group_data], bigIndex) => (
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
            key={bigIndex}
          >
            <h1>{group}</h1>
            {group_data.map((matches, index) => (
              <Box
                pb={0.01}
                sx={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <Typography component="h4">
                  <TextField
                    name={`predictionValues[${bigIndex}][${index}].team1`}
                    type="text"
                    value={matches.TeamA}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                  name={`predictionValues[${bigIndex}][${index}].score1`}
                  onChange={formik.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 50 }}
                  name={`predictionValues[${bigIndex}][${index}].score2`}
                  onChange={formik.handleChange}
                />
                <Typography component="h4">{matches.TeamB} </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
};
export default Predictions;

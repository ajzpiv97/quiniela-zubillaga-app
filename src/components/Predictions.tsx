import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../hooks/hooks";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { submitButtonHelper } from "../utils/styleHelper";
import { apiCall, parseJwt, signOut } from "../utils/authenticateUser";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

interface PredictionsI {
  roundId: number;
  startPredictionTimestamp: number;
  endPredictionTimestamp: number;
}
interface groupDataI {
  [key: string]: Array<gameDataI>;
}

interface groupDataRequestI {
  [key: string]: Array<gameDataRequestI>;
}

interface gameDataRequestI {
  team1: string;
  team2: string;
  score1: number | string;
  score2: number | string;
}

interface gameDataI {
  ActualScore: string;
  TeamA: string;
  TeamB: string;
  UserPredictedScore: string;
  DateTimestamp: number;
}

const normalizeObject = (obj: groupDataRequestI): Array<gameDataRequestI> => {
  let array: Array<gameDataRequestI> = [];
  Object.values(obj).forEach((data) => array.push(...data));

  return array;
};

const checkIfObjectIsNotEmpty = (obj: Object): boolean => {
  return !(
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const allowInputPredictionsBasedOnDateRange = (
  startTimestamp: number | null,
  endTimestamp: number
): boolean => {
  const endDate = new Date(endTimestamp * 1000).toUTCString();

  const utcNowDate = new Date().toUTCString();

  if (startTimestamp !== null) {
    let startDate = new Date(startTimestamp * 1000).toUTCString();

    if (
      Date.parse(utcNowDate) >= Date.parse(endDate) ||
      Date.parse(utcNowDate) <= Date.parse(startDate)
    ) {
      return true;
    }

    return false;
  }

  return Date.parse(utcNowDate) >= Date.parse(endDate);
};

const decodeToken = (): Object => {
  const decodedToken = parseJwt(localStorage.getItem("token"));
  return decodedToken.email;
};

const Predictions = ({
  roundId,
  startPredictionTimestamp,
  endPredictionTimestamp,
}: PredictionsI) => {
  let dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [buttonColorStatus, setButtonColorStatus] = React.useState<
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
  >("primary");
  const formik = useFormik({
    initialValues: {
      predictionValues: {} as groupDataRequestI,
    },
    validationSchema: Yup.object({
      predictionValues: Yup.object()
        .required()
        .shape({
          local: Yup.lazy(() => {
            return Yup.array().of(
              Yup.object().shape({
                team1: Yup.string().required(),
                team2: Yup.string().required(),
                score1: Yup.string().required("Is required"),
                score2: Yup.string().required("Is required"),
              })
            );
          }),
        }),
    }),

    onSubmit: () => {
      setLoading(formik.isSubmitting);
      apiCall({
        domain: "https://quiniela-zubillaga-api.herokuapp.com",
        endpoint: "api/user-actions/update-predictions",
        method: "post",
        headers: {
          "Auth-token": localStorage.getItem("token")!,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          predictions: normalizeObject(values.predictionValues),
        },
      })
        .then((response) => {
          if (response.status === 200 || response?.status === 201) {
            setLoading(false);
            setButtonColorStatus("success");
            setTimeout(() => {
              setButtonColorStatus("primary");
            }, 1000);
          }
        })
        .catch(({ response }: AxiosError) => {
          setLoading(false);
          if (response?.status === 422 || response?.status === 400) {
            setButtonColorStatus("error");
            setTimeout(() => {
              setButtonColorStatus("primary");
            }, 1000);
          } else {
            const { description } = response?.data as {
              code: number;
              description: string;
            };
            window.alert(description);
            return signOut({
              dispatch: dispatch,
              status: description,
              navigate: navigate,
            });
          }
        });
    },
  });
  const { values } = formik;

  const [isLoading, setIsLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState<groupDataI>({});

  React.useEffect(() => {
    apiCall({
      domain: "https://quiniela-zubillaga-api.herokuapp.com",
      endpoint: `api/user-actions/get-user-predictions?roundId=${roundId}`,
      method: "get",
      headers: {
        "Auth-token": localStorage.getItem("token")!,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setRowData(response.data["data"][0].games);
        }
      })
      .catch(({ response }: AxiosError) => {
        return signOut({
          dispatch,
          status: response?.statusText,
          navigate,
        });
      });
  }, [dispatch, navigate, roundId]);

  React.useEffect(() => {
    if (checkIfObjectIsNotEmpty(rowData)) {
      let rows: groupDataRequestI = {};
      Object.entries(rowData).forEach(([key, array]) => {
        array.forEach((value) => {
          let score1, score2;

          if (value.UserPredictedScore) {
            const splitScores = value.UserPredictedScore.split("-");
            score1 = splitScores[0] !== "" ? Number(splitScores[0]) : "";
            score2 = splitScores[1] !== "" ? Number(splitScores[1]) : "";
          } else {
            score1 = score2 = "";
          }
          const formikObject = {
            team1: value.TeamA,
            team2: value.TeamB,
            score1: score1,
            score2: score2,
          };
          if (key in rows) {
            rows[key].push(formikObject);
          } else {
            rows[key] = [formikObject];
          }
        });
      });
      formik.setFieldValue("predictionValues", rows);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <Container
        component="form"
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        onSubmit={formik.handleSubmit}
        maxWidth="xl"
      >
        {Object.entries(rowData).map(
          (
            [group, group_data]: [string, Array<gameDataI>],
            bigIndex: number
          ): any => (
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
                  <Typography component="h4">{matches.TeamA}</Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: 50 }}
                    name={`predictionValues[${group}][${index}].score1`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      checkIfObjectIsNotEmpty(values.predictionValues) &&
                      group in values.predictionValues
                        ? values.predictionValues[group][index].score1
                        : ""
                    }
                    disabled={
                      decodeToken() === process.env["REACT_APP_NOT_SECRET_CODE"]
                        ? false
                        : allowInputPredictionsBasedOnDateRange(
                            startPredictionTimestamp,
                            endPredictionTimestamp
                          )
                    }
                  />
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: 50 }}
                    name={`predictionValues[${group}][${index}].score2`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      checkIfObjectIsNotEmpty(values.predictionValues) &&
                      group in values.predictionValues
                        ? values.predictionValues[group][index].score2
                        : ""
                    }
                    disabled={
                      decodeToken() === process.env["REACT_APP_NOT_SECRET_CODE"]
                        ? false
                        : allowInputPredictionsBasedOnDateRange(
                            startPredictionTimestamp,
                            endPredictionTimestamp
                          )
                    }
                  />
                  <Typography component="h4">{matches.TeamB} </Typography>
                </Box>
              ))}
            </Box>
          )
        )}

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          color={buttonColorStatus}
          disabled={
            decodeToken() === process.env["REACT_APP_NOT_SECRET_CODE"]
              ? false
              : allowInputPredictionsBasedOnDateRange(
                  startPredictionTimestamp,
                  endPredictionTimestamp
                )
          }
        >
          {submitButtonHelper(buttonColorStatus, "updatePrediction", loading)}
        </LoadingButton>
      </Container>
    </ThemeProvider>
  );
};
export default Predictions;

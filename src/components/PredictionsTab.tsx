import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import MenuBar from "./Menubar";
import Predictions from "../components/Predictions";
import { useAppDispatch } from "../hooks/hooks";
import { apiCall, signOut } from "../utils/authenticateUser";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface RoundDataI {
  id: number;
  name: string;
  startTimestamp: number;
  startPredictionTimestamp: number;
  endTimestamp: number;
  endPredictionTimestamp: number;
}

interface TabsI {
  label: string;
  children: React.ReactNode;
}

const PredictionsTab = () => {
  let dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [roundData, setRoundData] = React.useState<Array<RoundDataI>>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [tabs, setTabs] = React.useState<Array<TabsI>>([]);

  React.useEffect(() => {
    apiCall({
      domain: "https://quiniela-zubillaga-api.herokuapp.com",
      endpoint: "api/user-actions/get-rounds",
      method: "get",
      headers: {
        "Auth-token": localStorage.getItem("token")!,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          setRoundData(response.data["data"]);
        }
      })
      .catch(({ response }: AxiosError) => {
        return signOut({
          dispatch: dispatch,
          status: response?.statusText,
          navigate: navigate,
        });
      });
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (roundData.length !== 0) {
      const tabs = roundData.map(
        ({ id, name, startPredictionTimestamp, endPredictionTimestamp }) => {
          return {
            label: name,
            children: (
              <Predictions
                roundId={id}
                startPredictionTimestamp={startPredictionTimestamp}
                endPredictionTimestamp={endPredictionTimestamp}
              />
            ),
          };
        }
      );

      setTabs(tabs);
      setIsLoading(false);
    }
  }, [roundData]);
  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <MenuBar pages={tabs} borderBottom={0} centered={true} />
  );
};
export default PredictionsTab;

import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import MenuBar from "../components/menubar";
import Predictions from "../components/Predictions";
import { useAppDispatch } from "../hooks/hooks";
import { isUserAuthenticated } from "../store/actions";

const fetchTableEntries = async (): Promise<Response> => {
  return await fetch(
    "https://quiniela-zubillaga-api.herokuapp.com/api/user-actions/get-rounds",
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
  const [roundData, setRoundData] = React.useState<Array<RoundDataI>>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [tabs, setTabs] = React.useState<Array<TabsI>>([]);

  React.useEffect(() => {
    fetchTableEntries()
      .then((response) => response.json())
      .then((response) => {
        if (response.code !== undefined && response.code > 300) {
          dispatch(isUserAuthenticated());
          localStorage.removeItem("token");
          throw new Error("Sessión expiró!");
        } else {
          setRoundData(response.data);
        }
      })
      .catch((error) => window.alert(error));
  }, [dispatch]);

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

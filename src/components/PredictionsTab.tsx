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

const setActiveTabBasedOnDate = (
  startTimestamp: number,
  endTimestamp: number
) => {
  const endDate = new Date(endTimestamp * 1000).toUTCString();
  const utcNowDate = new Date().toUTCString();
  const startDate = new Date(startTimestamp * 1000).toUTCString();

  if (
    Date.parse(utcNowDate) < Date.parse(endDate) &&
    Date.parse(utcNowDate) >= Date.parse(startDate)
  ) {
    return true;
  }

  return false;
};

const PredictionsTab = () => {
  let dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [roundData, setRoundData] = React.useState<Array<RoundDataI>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tabs, setTabs] = React.useState<Array<TabsI>>([]);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  React.useEffect(() => {
    apiCall({
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
    let tabIndex = -1;
    if (roundData.length !== 0) {
      const tabs = roundData.map(
        (
          {
            id,
            name,
            startTimestamp,
            endTimestamp,
            startPredictionTimestamp,
            endPredictionTimestamp,
          },
          index
        ) => {
          if (setActiveTabBasedOnDate(startTimestamp, endTimestamp)) {
            tabIndex = index;
          }
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
      setActiveTab(tabIndex > -1 ? tabIndex : 0);
      setTabs(tabs);
      setIsLoading(false);
    }
  }, [roundData]);

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <MenuBar
      pages={tabs}
      borderBottom={0}
      centered={true}
      activeTab={activeTab}
    />
  );
};
export default PredictionsTab;

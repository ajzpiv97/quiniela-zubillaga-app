import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";
import MenuBar from "../components/Menubar";
import PredictionsTab from "../components/PredictionsTab";
import ScoreTable from "../components/ScoreTable";
import { signOut } from "../utils/authenticateUser";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainTabs = [
    { label: "Tabla de posiciones", children: <ScoreTable /> },
    { label: "Predicciones", children: <PredictionsTab /> },
    {
      label: (
        <div
          onClick={() => {
            return signOut({ dispatch: dispatch, navigate: navigate });
          }}
        >
          <LogoutIcon />
        </div>
      ),
    },
  ];
  return <MenuBar pages={mainTabs} />;
};
export default Dashboard;

import * as React from "react";
import MenuBar from "../components/menubar";
import Predictions from "../components/Predictions";
import PredictionsTab from "../components/PredictionsTab";
import ScoreTable from "../components/ScoreTable";

const Dashboard = () => {
  const mainTabs = [
    { label: "Tabla de posiciones", children: <ScoreTable /> },
    { label: "Predicciones", children: <PredictionsTab /> },
  ];
  return <MenuBar pages={mainTabs} />;
};
export default Dashboard;

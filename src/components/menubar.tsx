import * as React from "react";
// import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
interface MenuBarI {
  pages: Array<TabsI>;
  borderBottom?: number;
  centered?: boolean;
}

interface TabsI {
  label: string;
  children?: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 3, paddingBottom: 3 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const theme = createTheme();

const MenuBar = ({ pages, borderBottom = 1, centered = false }: MenuBarI) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: borderBottom, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered={centered}>
            {pages.map(({ label }, index: number) => (
              <Tab label={label} {...a11yProps(index)} key={index} />
            ))}
          </Tabs>
        </Box>
        {pages.map(({ children }, index) => (
          <TabPanel value={value} index={index} key={index}>
            {children}
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
};
export default MenuBar;

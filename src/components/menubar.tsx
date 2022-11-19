import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';   


const theme = createTheme();
const pages = ['Tabla', 'Predicciones'];

 const menuBar = (props:any) => (
    <Container component="main" maxWidth="xl">
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, bgcolor: "light gray" }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/Tablas"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'blue',
          textDecoration: 'none',
        }}
      >
        Quiniela
      </Typography>
        {pages.map((page) => (
          <Button
            key={page}
            href={"/"+page}
            sx={{ my: 2,color: 'blue', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Toolbar>
    </Container>
  );
export default menuBar;

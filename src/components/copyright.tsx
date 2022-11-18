import * as React from "react";
import Typography from "@mui/material/Typography";

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    Quiniela Zubillaga {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;

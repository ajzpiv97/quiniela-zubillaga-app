import * as React from "react";
import Typography from "@mui/material/Typography";

const CustomCopyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    Quiniela Zubillaga {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default CustomCopyright;

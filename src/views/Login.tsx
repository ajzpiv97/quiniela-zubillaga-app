import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Copyright from "../components/copyright";
import { submitButtonHelper } from "../utils/styleHelper";
import { useAppDispatch } from "../hooks/hooks";
import { isUserAuthenticated } from "../store/actions";

const theme = createTheme();

const LogIn = () => {
  let dispatch = useAppDispatch();

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
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "username@email.com",
      password: "Password123",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().max(255).required("Password is required"),
    }),

    onSubmit: () => {
      setLoading(formik.isSubmitting);
      fetch("https://quiniela-zubillaga-api.herokuapp.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      })
        .then((response) => {
          setLoading(false);
          return response.json();
        })
        .then((response) => {
          if (response.code === 401 || response.code === 400) {
            setButtonColorStatus("error");
            throw new Error(response["description"]);
          } else {
            //add redirect
            setButtonColorStatus("success");
            localStorage.setItem("token", response.data.token);
            dispatch(isUserAuthenticated());

            return navigate("/dashboard");
          }
        })
        .catch((error) => {
          window.alert(error);
          setTimeout(() => {
            setButtonColorStatus("primary");
          }, 1000);
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              loadingPosition="start"
              startIcon={<SendIcon />}
              color={buttonColorStatus}
            >
              {submitButtonHelper(buttonColorStatus, "login", loading)}
            </LoadingButton>
            <Grid container direction="row-reverse">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link
                  to="/"
                  className="css-101ca9i-MuiTypography-root-MuiLink-root"
                >
                  No tienes cuenta? Inscríbete
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LogIn;

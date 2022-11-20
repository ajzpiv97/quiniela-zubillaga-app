import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Copyright from "../components/copyright";
import { submitButtonHelper } from "../utils/styleHelper";

const theme = createTheme();

const SignUp = () => {
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
      email: "",
      password: "",
      name: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().max(255).required("Password is required"),
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),

    onSubmit: () => {
      setLoading(formik.isSubmitting);
      fetch("https://quiniela-zubillaga-api.herokuapp.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: formik.values.email,
          name: formik.values.name,
          password: formik.values.password,
          lastName: formik.values.lastName,
        }),
      })
        .then((response) => {
          setLoading(false);
          return response.json();
        })
        .then((response) => {
          if (response.code === 400) {
            setButtonColorStatus("error");
            throw new Error(response["description"]);
          } else {
            setButtonColorStatus("success");
            setTimeout(() => {
              return navigate("/login");
            }, 1000);
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
            Registrate
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  autoComplete="given-name"
                  name="name"
                  required
                  id="name"
                  label="Nombre"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  fullWidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              color={buttonColorStatus}
            >
              {submitButtonHelper(buttonColorStatus, "signUp", loading)}
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  className="css-101ca9i-MuiTypography-root-MuiLink-root"
                >
                  Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

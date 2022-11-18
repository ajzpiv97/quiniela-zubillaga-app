const buttonObject = {
  signUp: {
    loading: "Creando......",
    success: "Usuario Creado!",
    error: "Error!",
    otro: "Inscribete",
  },
  login: {
    loading: "Iniciando sesión......",
    success: "Exitó",
    error: "Error!",
    otro: "Inicia Sesión",
  },
};

export const submitButtonHelper = (
  buttonStatus: string,
  component: "signUp" | "login",
  isLoading: boolean = false
) => {
  if (isLoading) {
    return buttonObject[component]["loading"];
  }
  if (buttonStatus === "success") {
    return buttonObject[component][buttonStatus];
  } else if (buttonStatus === "error") {
    return buttonObject[component][buttonStatus];
  } else {
    return buttonObject[component]["otro"];
  }
};

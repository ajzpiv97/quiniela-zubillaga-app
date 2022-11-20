import { USER_AUTHENTICATION } from "./action-types";

export const isUserAuthenticated = (authenticationValue: boolean) => {
  if (!authenticationValue) {
    localStorage.removeItem("token");
  }
  return {
    type: USER_AUTHENTICATION,
    payload: {
      isLoggedIn: authenticationValue,
    },
  };
};

import { parseJwt } from "../../utils/authenticateUser";
import { USER_AUTHENTICATION } from "./action-types";

export const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  let loggedIn = false;
  if (token) {
    const decodedJwt = parseJwt(token);
    const expirationDate = new Date(
      decodedJwt.expiration_date * 1000
    ).toUTCString();
    const utcNowDate = new Date().toUTCString();

    if (Date.parse(expirationDate) > Date.parse(utcNowDate)) {
      loggedIn = true;
    }
  }

  return {
    type: USER_AUTHENTICATION,
    payload: {
      isLoggedIn: loggedIn,
    },
  };
};

import { parseJwt } from "../../utils/authenticateUser";
import { USER_AUTHENTICATION } from "./action-types";

export const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  let loggedIn = false;
  if (token) {
    const decodedJwt = parseJwt(token);
    const expirationDate = new Date(decodedJwt.expiration_date).toString();
    const utcNowDate = new Date().toUTCString();
    const pattern = /\d{2}:\d{2}:\d{2}/;

    const expirationDatePattern = expirationDate.match(pattern)![0];
    const utcNowDatePattern = utcNowDate.match(pattern)![0];
    if (
      expirationDatePattern !== undefined &&
      utcNowDatePattern !== undefined
    ) {
      if (expirationDatePattern > utcNowDatePattern) {
        loggedIn = true;
      }
    }
  }

  return {
    type: USER_AUTHENTICATION,
    payload: {
      isLoggedIn: loggedIn,
    },
  };
};

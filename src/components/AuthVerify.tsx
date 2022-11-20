import * as React from "react";
import { useLocation } from "react-router-dom";
import { parseJwt } from "../utils/authenticateUser";
import { useAppDispatch } from "../hooks/hooks";
import { isUserAuthenticated } from "../store/actions";
const AuthVerify = () => {
  let location = useLocation();
  let dispatch = useAppDispatch();
  React.useEffect(() => {
    const token = localStorage.getItem("token");

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
        if (expirationDatePattern < utcNowDatePattern) {
          dispatch(isUserAuthenticated(false));
        } else {
          dispatch(isUserAuthenticated(true));
        }
      } else {
        dispatch(isUserAuthenticated(false));
      }
    }
  }, [dispatch, location]);

  return <></>;
};

export default AuthVerify;

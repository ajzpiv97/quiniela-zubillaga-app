import * as React from "react";
import { useLocation } from "react-router-dom";
import { parseJwt } from "../utils/authenticateUser";

const AuthVerify = (props: any) => {
  let location = useLocation();

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
          props.logOut();
        } else {
          props.logIn();
        }
      } else {
        props.logOut();
      }
    }
  }, [location, props]);

  return <></>;
};

export default AuthVerify;

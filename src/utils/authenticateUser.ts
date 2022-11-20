import * as React from "react";
export const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// const VerifyUser = (props) => {
//   React.useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//       const decodedJwt = parseJwt(user.accessToken);

//       if (decodedJwt.exp * 1000 < Date.now()) {
//         props.logOut();
//       }
//     }
//   }, [location, props]);

//   return;
// };

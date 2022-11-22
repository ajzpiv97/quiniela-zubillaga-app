export const parseJwt = (token: string | null) => {
  try {
    if (token === null) {
      throw new Error("Token not found");
    }
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

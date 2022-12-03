import axios, { AxiosResponse } from "axios";
import { isUserAuthenticated } from "../store/userLogin/action";

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

interface AxiosI {
  domain: string;
  endpoint: string;
  method?: string;
  mode?: string;
  headers?: Record<string, string | number | boolean>;
  data?: Record<string, any>;
}

export const apiCall = async ({
  domain,
  endpoint,
  method = "get",
  mode = "cors",
  headers = {},
  data = {},
}: AxiosI): Promise<AxiosResponse> => {
  const default_headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  const final_headers = {
    ...default_headers,
    ...headers,
  };

  const apiUrl = new URL(endpoint, domain);

  const requestConfig: Record<string, any> = {
    url: apiUrl,
    method: method,
    mode: mode,
    headers: final_headers,
    data: data,
  };

  return await axios.request(requestConfig);
};

interface signOutI {
  dispatch: any;
  status?: string;
  navigate?: any;
}

export const signOut = ({ dispatch, status, navigate }: signOutI) => {
  dispatch(isUserAuthenticated());
  localStorage.removeItem("token");
  if (status) {
    window.alert(status);
  }
  return navigate("/");
};

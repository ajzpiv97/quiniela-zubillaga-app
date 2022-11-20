import { USER_AUTHENTICATION } from "./action-types";

const initialState = {
  isLoggedIn: false,
};

interface ActionI {
  type: string;
  payload: PayloadI;
}

interface PayloadI {
  isLoggedIn: boolean;
}

const UserAuthenticatedState = (
  state = initialState,
  { type, payload }: ActionI
) => {
  console.log(type, payload);

  switch (type) {
    case USER_AUTHENTICATION:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default UserAuthenticatedState;

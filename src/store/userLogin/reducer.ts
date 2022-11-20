import { USER_AUTHENTICATION } from "./action-types";

const initialState = {
  isLoggedIn: null,
};

interface ActionI {
  type: string;
  payload: PayloadI;
}

interface PayloadI {
  isLoggedIn: boolean | null;
}

const UserAuthenticatedState = (
  state = initialState,
  { type, payload }: ActionI
) => {
  switch (type) {
    case USER_AUTHENTICATION:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default UserAuthenticatedState;

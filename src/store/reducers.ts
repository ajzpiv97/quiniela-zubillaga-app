import { combineReducers } from "redux";

import UserAuthenticatedState from "./userLogin/reducer";

const reducers = combineReducers({
  authReducer: UserAuthenticatedState,
});

export default reducers;


import { combineReducers } from "redux";
import { complianceReducer, userReducer } from "./reducer";

import store from "./store";

export const reducer = combineReducers({
  user: userReducer,
  compliance: complianceReducer
});

export { store };

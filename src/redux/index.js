
import { combineReducers } from "redux";
import { complianceReducer, getUserReducer, userReducer } from "./reducer";

import store from "./store";

export const reducer = combineReducers({
  user: userReducer,
  compliance: complianceReducer,
  userList: getUserReducer

});

export { store };

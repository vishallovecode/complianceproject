
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { complianceReducer, userReducer } from "./reducer";


const store = createStore(
  combineReducers({
    user: userReducer,
    compliance: complianceReducer || null

  }),
  {},
  applyMiddleware(thunk)
);

export default store;


import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { complianceReducer, getUserReducer, userReducer } from "./reducer";


const store = createStore(
  combineReducers({
    user: userReducer,
    compliance: complianceReducer || null,
    userList: getUserReducer

  }),
  {},
  applyMiddleware(thunk)
);

export default store;

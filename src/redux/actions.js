

import { concatAST } from "graphql";
import { BASE_URL, COMPLIANCE, USER, USER_SIGNIN, USER_SIGNUP } from "../constants";
import AxiosInstance from "../middleware/axios";

export const REGISTRATION_REQUESTED = "REGISTRATION_REQUESTED";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const GET_COMPLIANCE ="GET_COMPLIANCE";
export const GET_COMPLIANCE_FAILED = "GET_COMPLIANCE_FAILED";
export const GET_COMPLIANCE_SUCCESS = "GET_COMPLIANCE_SUCCESS";

export const GET_USERS ="GET_USERS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const ADD_USERS ="ADD_USERS";
export const ADD_USERS_FAILED = "ADD_USERS_FAILED";
export const ADD_USERS_SUCCESS = "ADD_USERS_SUCCESS";



export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER
  });
};

export const removeMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE
  });
};

export const registerUser = (userData) => (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUESTED,
    payload: null
  });

  AxiosInstance
    .post(`${BASE_URL}${USER_SIGNUP}`, userData)
    .then((response) => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTRATION_FAILED,
        payload: err.response ? err.response.data : err.message
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUESTED,
    payload: null
  });

  AxiosInstance
    .post(USER_SIGNIN, userData)
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
  
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: err.response ? err.response.data : err.message
      });
    });
};

export const getCompliance = ()=>(dispatch)=> {
  dispatch({
    type:GET_COMPLIANCE
  });
  AxiosInstance.get(COMPLIANCE).then((response)=>{
    dispatch({
      type: GET_COMPLIANCE_SUCCESS,
      payload: response.data
    })
  }).catch(error=>{
    dispatch({
      type: GET_COMPLIANCE_FAILED,
      payload: err.response ? err.response.data : err.message
    })
 
  });
}

export const getUsers =()=>(dispatch)=> {
dispatch({
  type: GET_USERS
})
AxiosInstance.get(USER).then((response)=>{
  dispatch({
    type: GET_USERS_SUCCESS,
    payload: response.data
  })
}).catch((error)=>{
dispatch({
  type:GET_USERS_FAILED,
  payload: error?.response ? error?.response.data : error.message
})
})
}

export const createUser = (userData)=> (dispatch)=> {
  dispatch({
    type:ADD_USERS,
    payload:null
  })
  AxiosInstance.post(USER , userData).then((response)=>{
    dispatch({
      type: ADD_USERS_SUCCESS,
      payload: response.data
    })
  }).catch((error)=>{
  dispatch({
    type:ADD_USERS_FAILED,
    payload: error.response ? error.response.data : error.message
  })
  })
}

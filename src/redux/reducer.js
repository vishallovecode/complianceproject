import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_REQUESTED,
  REGISTRATION_SUCCESS,
  LOGOUT_USER,
  CLEAR_MESSAGE,
  GET_COMPLIANCE,
  GET_COMPLIANCE_FAILED,
  GET_COMPLIANCE_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED
} from "./actions";

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  success: false,
  status: ""
};
const initialCompliance = {
  data: [],
  loading: false,
}
const initialUserstate = {
  data: [],
  loading: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return { ...initialState, status: "", success: false, loading: false };
    case LOGOUT_USER:
      localStorage.removeItem("authToken");
      window.location.pathname = '/login'
      return initialState;
    case LOGIN_REQUESTED:
      return { ...initialState, loading: true, status: "Authenticating..." };
    case LOGIN_SUCCESS:
      const {  accessToken } = action.payload;
      const user = {
        role:action.payload,
        email: action.payload.email,
        phone: action.payload.phone,
        company:action.payload.company
      }
      localStorage.setItem("authToken", accessToken);
      return {
        ...state,
        user: { ...user, accessToken },
        isAuthenticated: true,
        loading: false,
        success: true,
        status: action.payload.status
      };
    case LOGIN_FAILED:
      return { ...initialState, status: action.payload.status };

    case REGISTRATION_REQUESTED:
      return {
        ...initialState,
        loading: true,
        status: "Registering..."
      };
    case REGISTRATION_SUCCESS:
      return {
        ...initialState,
        success: true,
        status: action.payload.status
      };
    case REGISTRATION_FAILED:
      return {
        ...initialState,
        status: action.payload.status
      };
    default:
      return { ...state };
  }
};

export const complianceReducer  = (state = initialCompliance, action) => {
  switch (action.type) {
    case GET_COMPLIANCE: {
      return {
        ...initialCompliance,
        loading: true,
      }
    };
    case GET_COMPLIANCE_FAILED:{
      return {
        ...initialCompliance,
        loading: false
      }
    };
    case GET_COMPLIANCE_SUCCESS: {
   return   { 
      ...initialCompliance,
      loading:false, 
      data: action?.payload 
    }
    }
    default: {
      return {
        ...initialCompliance
      }
    }
  }
}

export const getUserReducer = (state= initialUserstate,action)=>{
  switch(action.type) {
    case GET_USERS: {
      return {
        ...initialUserstate,
         loading:true
      }
    };
    case GET_USERS_SUCCESS: {
      return {
        ...initialUserstate,
        data:action.payload,
        loading: false
      }
    };
    case GET_USERS_FAILED:{
      return {
        ...initialUserstate,
        loading: false
      }
    };
    default: {
      return {
        ...initialCompliance
      }
    };
  }
}



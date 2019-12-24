import { LOGIN_ADMIN,
    LOGOUT_ADMIN,
    REQUEST_USER_LOGIN
} from "../Actions/ActionTypes/actionTypes"


const initialState = {
   sessions :[],
   isLoggedIn: false,
   isFetchingAdminData: false,
   activeAdmin: null,
 }
 
 export const adminReducer=(state = initialState, action = {} ) => {
    switch (action.type){
        case REQUEST_USER_LOGIN:
            return {...state, isFetchingAdminData: true}
        case LOGIN_ADMIN :
            return {...state, activeAdmin: action.payload, isLoggedIn: true, isFetchingAdminData: false};
        case LOGOUT_ADMIN:
            return {...state, activeAdmin: null, isLoggedIn: false};
        case "GET_ADMIN_SESSIONS" :
            return {...state, sessions : action.payload};
        default:
            return state
 
     }
 }
 
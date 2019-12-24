import { LOGIN_USER,
         LOGOUT_USER,
         GET_WINNERS,
         RESTORE,
         SIGN_UP_SUCCESS,
         ERROR_MESSAGE,
         SUCCESS_MESSAGE,
         REQUEST_USER_LOGIN
} from "../Actions/ActionTypes/actionTypes"

const initialState = {
    activeUser: {},
    winners:[],
    winnersLength:0,
    error: "",
    signUpSucces : false,
    success: "",
    isFetchingUserData: false,
    isLoggedIn: false
 }

 export const lottoReducer=(state = initialState, action = {} ) => {
    switch (action.type){   
        case REQUEST_USER_LOGIN:
            return {...state, isFetchingUserData: true}   
        case LOGIN_USER :
            return {...state, activeUser : action.payload, isFetchingUserData: false, isLoggedIn: true};
        case LOGOUT_USER:
            return {...state, activeUser : {}, isLoggedIn: false};
        case GET_WINNERS :
            return {...state, winners:action.payload.winners, winnersLength : action.payload.winnersLength};
        case RESTORE :
            return {...state, signUpSucces : false, error : "", success : "" };
        case SIGN_UP_SUCCESS :
            return {...state, signUpSucces : true }
        case ERROR_MESSAGE :
            return {...state, error : action.payload }
        case SUCCESS_MESSAGE:
            return {...state, success :action.payload}
        default:
            return state

    }
}
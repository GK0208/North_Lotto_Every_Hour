import { 
    GET_WINNERS,
    RESTORE,
    SIGN_UP_SUCCESS,
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    GET_USERS
} from "../Actions/ActionTypes/actionTypes"


const initialState = {
    winners:[],
    users:[],
    usersLength : 0,
    winnersLength:0,
    error: "",
    signUpSucces : false,
    success: ""
 }

 export const lottoReducer=(state = initialState, action = {} ) => {
    switch (action.type){      
        case GET_WINNERS :
            return {...state, winners: action.payload.winners, winnersLength: action.payload.winnersLength};
        case GET_USERS :
            return {...state,users: action.payload.users, usersLength: action.payload.usersLength}
        case RESTORE:
            return {...state, signUpSucces: false, error: "", success: "" };
        case SIGN_UP_SUCCESS:
            return {...state, signUpSucces: true }
        case ERROR_MESSAGE:
            return {...state, error: action.payload }
        case SUCCESS_MESSAGE:
            return {...state, success: action.payload}
        default:
            return state

    }
}
import { combineReducers } from 'redux';
import { userReducer } from "./userReducer";
import { lottoReducer } from "./lottoReducer"
import { connectRouter } from 'connected-react-router'

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer,
    lottoReducer
})
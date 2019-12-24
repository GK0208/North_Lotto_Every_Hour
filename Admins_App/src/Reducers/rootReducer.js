import { combineReducers } from 'redux';
import { adminReducer } from "./adminReducer";
import { lottoReducer } from "./LottoReducer"
import { connectRouter } from 'connected-react-router'

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    adminReducer,
    lottoReducer
})
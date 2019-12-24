import { GET_USER_TICKETS,
    
} from "../Actions/ActionTypes/actionTypes"


const initialState = {
   userTickets:[],
   userTicketsLength:0,  
   balance : 0,
   bonuses:[]
}

export const userReducer=(state = initialState, action = {} ) => {
    switch (action.type){
        case GET_USER_TICKETS :
            return {...state, userTickets : action.payload.tickets, userTicketsLength : action.payload.ticketsLength}
        case "GET_BONUS" :
            return {...state,bonuses:[...state.bonuses,action.payload]}
        default:
            return state
    }
}

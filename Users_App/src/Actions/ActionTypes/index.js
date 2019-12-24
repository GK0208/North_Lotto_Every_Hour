import { LOGIN_USER,
    LOGOUT_USER,
    GET_WINNERS,
    GET_USER_TICKETS,
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    GET_BONUS,
    SIGN_UP_SUCCESS,
    REQUEST_USER_LOGIN
} from "./actionTypes"


export const responseMessageSuccess = res => ({
    type: SUCCESS_MESSAGE,
    payload: res.message
});

export const responseMessageError = res => ({
    type: ERROR_MESSAGE,
    payload : res.message
})

export const getBonus = res => ({
    type: GET_BONUS,
    payload: res.bonus
})

export const getTickets = tickets => ({
    type: GET_USER_TICKETS,
    payload: tickets
});

export const getAllWinners = winners => ({
    type: GET_WINNERS,
    payload: winners
});

export const loginUser = userObj => ({
    type: LOGIN_USER,
    payload: userObj
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const signUp = () => ({
    type: SIGN_UP_SUCCESS
})

export const requestLogin = () => ({
    type: REQUEST_USER_LOGIN
})


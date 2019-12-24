import { LOGIN_ADMIN,
    LOGOUT_ADMIN,
    GET_WINNERS,
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    GET_USERS,
    REQUEST_USER_LOGIN
} from "./actionTypes"

export const requestLogin = () => ({
    type: REQUEST_USER_LOGIN
})

export const getUsers = users => ({
    type: GET_USERS,
    payload: users
});

export const responseMessageSuccess = res => ({
    type: SUCCESS_MESSAGE,
    payload: res.message
});

export const responseMessageError = res => ({
    type: ERROR_MESSAGE,
    payload : res.message ? res.message : res
})


export const getAllWinners = winners => ({
    type: GET_WINNERS,
    payload: winners
});

export const loginAdmin = userObj => ({
    type: LOGIN_ADMIN,
    payload: userObj
});

export const logoutAdmin = () => ({
    type: LOGOUT_ADMIN
});


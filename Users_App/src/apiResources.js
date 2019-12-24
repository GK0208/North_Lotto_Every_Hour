
export const HOST = 'http://localhost:5000'

export const ENDPOINTS = {
    'getProfile': { 
        'path':'/user/getProfile',
        'method': 'GET'
    },
    'authenticate': {
        'path': '/user/authenticate',
        'method': 'POST'
    },
    'refreshToken': {
        'path': '/user/refreshUserToken',
        'method': 'POST'
    },
    'getWinners': {
        'path': '/user/winners',
        'method': 'GET'
    },
    'signUp': {
        'path': '/user/register',
        'method': 'POST'
    },
    'confirmUserEmail': {
        'path': '/user/emailConfirmation',
        'method': 'POST'
    },
    'createTicket': {
        'path': '/user/createTicket',
        'method': 'POST'
    },
    'getWinners': {
        'path': '/user/winners',
        'method': 'GET'
    },
    'getTickets': {
        'path': '/user/tickets',
        'method': 'GET'
    },
    'updateUser': {
        'path': '/user/updateUser',
        'method': 'POST'
    },
    'addCredit': {
        'path': '/user/addCredit',
        'method': 'POST'
    },
    'subscribeUser': {
        'path': '/user/subscribeUser',
        'method': 'POST'
    },
    'acceptBonus': {
        'path': '/user/confirmBonus',
        'method': 'POST'
    }
}
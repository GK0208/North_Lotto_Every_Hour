
export const HOST = 'http://localhost:5000'

export const ENDPOINTS = {
    'getProfile': { 
        'path':'/admin/getProfile',
        'method': 'GET'
    },
    'authenticate': {
        'path': '/admin/authenticate',
        'method': 'POST'
    },
    'refreshToken': {
        'path': '/admin/refreshAdminToken',
        'method': 'POST'
    },
    'getWinners': {
        'path': '/admin/winners',
        'method': 'GET'
    },
    'getUsers': {
        'path': '/admin/getUsers',
        'method': 'GET'
    },
    'updateAdmin': {
        'path': '/admin/updateAdmin',
        'method': 'POST'
    },
    'startDraw': {
        'path': '/admin/startDraw',
        'method': 'POST'
    },
    'userToAdmin': {
        'path': '/admin/confirmAdmin',
        'method': 'POST'
    }
}
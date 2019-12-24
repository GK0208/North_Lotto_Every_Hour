import { loginAdmin,
    logoutAdmin,
    requestLogin
} from "../ActionTypes"
import fetchData from '../../common/fetch'
import { push } from 'react-router-redux'
import { ENDPOINTS } from '../../apiResources'

export const getProfileFetch = () => {
    return async dispatch => {
      const token = localStorage.token ;
        if (token) {
            await fetchData(ENDPOINTS.getProfile.path, {}, undefined,ENDPOINTS.getProfile.method)
            .then(res => {
                if (res.status === 200)
                    res.json().then(data => dispatch(loginAdmin(data)))
                return;
            })
            .catch(err=>console.log(err))           
        }
    }
}

export const Login = ({username,password}) => (dispatch) => {
        const user = {
            "username" : username,
            "password" : password
        }; 
        const body = JSON.stringify(user);
        dispatch(requestLogin())
        return (
            fetchData(ENDPOINTS.authenticate.path, {}, body, ENDPOINTS.authenticate.method)
            .then(async res => {
                if (res.status === 200){
                    await res.json().then(response => {
                        localStorage.setItem(`token`, response.token);
                        localStorage.setItem("refreshToken", response.refreshToken)
                    })
                    dispatch(push('/home'))
                }
                else
                    document.getElementById("invalidLogin").style.display="block"
            })
            .catch(err=>console.log(err))       
        )
};

export const LogoutAdmin = () => dispatch=> {
    dispatch(logoutAdmin())    
    dispatch(push('/')) 
};

export const restore = () => dispatch =>{
    dispatch({type : "RESTORE"})
}

export const getToken = () => {
    const jwt = localStorage.getItem('token')
    let session
    try {
      if (jwt) {
        const base64Url = jwt.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        session = JSON.parse(window.atob(base64))
      }
    } catch (error) {
      console.log(error)
    }
    return session
}
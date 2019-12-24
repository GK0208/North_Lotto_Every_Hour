import {
  responseMessageSuccess,
  responseMessageError,
  getAllWinners,
  getUsers
} from "../ActionTypes";
import { fetchData } from '../../common/fetch';
import { ENDPOINTS } from '../../apiResources'

export const getWinners = (page,filter,userInput = "") => {
    return async dispatch => {
      const token = localStorage.token;
      if (token){
        await fetchData(ENDPOINTS.getWinners.path, { page, filter, userInput }, undefined, ENDPOINTS.getWinners.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => dispatch(getAllWinners(data)));
        })
        .catch(err=>console.log(err))
      }       
    }
}


export const GetUsers = (take) =>{
    return async dispatch => {
      const token = localStorage.token ;
      if (token) {
        await fetchData(ENDPOINTS.getUsers.path, {take}, undefined, ENDPOINTS.getUsers.method)
        .then(res => {
          if (res.status === 400 || res.status === 404)
              res.json().then(error => dispatch(responseMessageError(error)))
          else
              res.json().then(data => dispatch(getUsers(data)))
        })
        .catch(err=>console.log(err))
      }
    }
}   
  
  
  
export const updateAdmin = (admin) => {
    return async  dispatch => {
      const token = localStorage.token ;
      const body = JSON.stringify(admin);
      if (token) {
          await fetchData(ENDPOINTS.updateAdmin.path, {}, body, ENDPOINTS.updateAdmin.method)
          .then(res => {
            if (res.status === 400 || res.status === 404)
              res.json().then(error => dispatch(responseMessageError(error)))
            if(res.status === 200)
              res.json().then(data => dispatch(responseMessageSuccess(data)))
            return;
          })
          .catch(err=>console.log(err))
      }
    }
}

export const startDraw = () => {
    return async dispatch => {
      const token = localStorage.token ;
      if (token) {
        await fetchData(ENDPOINTS.startDraw.path, {}, undefined, ENDPOINTS.startDraw.method)
        .then(res => {
          if (res.status === 400 || res.status === 404)
            res.json().then(error => dispatch(responseMessageError(error)))
          if (res.status === 200)
            res.json().then(data => dispatch(responseMessageSuccess(data)))
          return;
        })
        .catch(err=>console.log(err))
      }   
    } 
}

export const MakeUserAdmin = (user) =>  {
  return async dispatch => {
    const token = localStorage.token ;
    const body = JSON.stringify(user);
    if (token) {
      await fetchData(ENDPOINTS.userToAdmin.path, {}, body, ENDPOINTS.userToAdmin.method)
      .then(res => {
        if (res.status === 400 || res.status === 404)
          res.json().then(error => dispatch(responseMessageError(error)))
        if (res.status === 200)
          res.json().then(data => dispatch(responseMessageSuccess(data)))
        return;
      })
      .catch(err=>console.log(err))
    };
  }
}
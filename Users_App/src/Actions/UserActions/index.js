import {
    responseMessageSuccess,
    responseMessageError,
    getTickets,
    getAllWinners,
    getBonus
} from "../ActionTypes"
import { fetchData } from '../../common/fetch';
import { ENDPOINTS } from '../../apiResources'


export const createTicket = (ticket) => async dispatch => {
      const token = localStorage.token ;
      const newTicket =JSON.stringify({
        "numbers" : ticket.toString()
      })
      if (token) {
        await fetchData(ENDPOINTS.createTicket.path, {}, newTicket, ENDPOINTS.createTicket.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => {
              if (data.bonus)
                dispatch(getBonus(data));
              dispatch(responseMessageSuccess(data));
            });          
        })
        .catch(err=>console.log(err))     
      }
}

export const AcceptBonus = (id) => async dispatch => {
      const token = localStorage.token ;
      if (token) {
        await fetchData(ENDPOINTS.acceptBonus.path, { id }, undefined, ENDPOINTS.acceptBonus.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => dispatch(responseMessageSuccess(data)));          
        })
        .catch(err=>console.log(err)) 
      }
}

export const subscribeUser = (subscriber) => async dispatch => {
  console.log(subscriber)
    const token = localStorage.token ;
    const body = JSON.stringify(subscriber)
      if (token) {
        await fetchData(ENDPOINTS.subscribeUser.path, {}, body, ENDPOINTS.subscribeUser.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => dispatch(responseMessageSuccess(data)));          
        })
        .catch(err=>console.log(err))     
      }
}

export const getUserTickets = (page = 1,filter = "All") =>  async dispatch => {
    const token = localStorage.token ;
    if (token) {
      await fetchData(ENDPOINTS.getTickets.path, { page, filter }, undefined, ENDPOINTS.getTickets.method)
      .then(res =>{
        if (res.status === 400 || res.status === 404)
          res.json().then(x => dispatch(responseMessageError(x)))
        else
          res.json().then(data => dispatch(getTickets(data)));          
      })
      .catch(err=>console.log(err)) 
    }
  
}

export const getWinners = (page, filter, userInput = "") => async dispatch => {
      const token = localStorage.token ;
      if (token) {
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



export const updateUser = (user) => async dispatch => {
      const token = localStorage.token ;
      const body = JSON.stringify(user);
      if (token) {
        await fetchData(ENDPOINTS.updateUser.path, {}, body, ENDPOINTS.updateUser.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => dispatch(responseMessageSuccess(data)));          
        })
        .catch(err=>console.log(err)) 
    }
}

export const addCredit = (credit) => async dispatch => {
    const token = localStorage.token ;
    const body = JSON.stringify(credit);
      if (token) {
        await fetchData(ENDPOINTS.addCredit.path, {}, body, ENDPOINTS.addCredit.method)
        .then(res =>{
          if (res.status === 400 || res.status === 404)
            res.json().then(x => dispatch(responseMessageError(x)))
          else
            res.json().then(data => dispatch(responseMessageSuccess(data)));          
        })
        .catch(err=>console.log(err)) 
      }
} 
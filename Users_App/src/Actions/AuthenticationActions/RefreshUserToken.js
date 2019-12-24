import fetchData from '../../common/fetch';
import { ENDPOINTS } from '../../apiResources'

export const RefreshUserToken = async (model) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const body = JSON.stringify(model)
    await fetchData(ENDPOINTS.refreshToken.path, {}, body,  ENDPOINTS.refreshToken.method, headers)
    .then(res => {
      res.json().then(data => {
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
      })
    })
}
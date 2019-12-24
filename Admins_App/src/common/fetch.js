import { queryParams } from './utils';
import { RefreshAdminToken } from '../Actions/AuthenticationActions/RefreshAdminToken';
import { HOST } from '../apiResources'

const FIXED_PATH = 'api';

export const fetchData = async (url, params, body, method, header) => {
    const path = `${HOST}/${FIXED_PATH + url + queryParams(params)}`;
    const token = localStorage.token;
    const headers = header
        ? header
        : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
    return await fetch(path, {
            method,
            headers,
            body
          }).then(async response => {
            if (response.status === 401){
                var refreshToken = localStorage.refreshToken;
                var model = {
                    refreshToken,
                    token
                }   
                await RefreshAdminToken(model)
                const res = await fetchData(url, params, body, method);
                return res;
            }
           return response;
        });
}

export default fetchData;
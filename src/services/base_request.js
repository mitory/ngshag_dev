import instance from './axios_settings';
import { authService } from './auth.service';
import store from '../store/store';

const TOTAL_ERROR = {response: { data: 'Сервер не отвечает, попробуйте позднее...', status: 500 }};
const TO_MANY_REQUESTS = {response: { data: 'Слишком много запросов, попробуйте позднее...', status: 500 }};
const TIMEOUT_ERROR = {response: { data: 'Слишком долгий запрос. Попробуйте еще раз.', status: 500 }};

async function makeRequest(method, url, data = null, useAuth = true, retry = true) {
    const config = {
        method: method,
        url: url,
        headers: useAuth ? authHeader() : { 'ngrok-skip-browser-warning': '69420' },
        data: data,
    };

    store.dispatch('loading/show');
    try {
        const response = await instance.request(config);
        return response.data;

    } catch(error) {
        if(error.response) {
            if(useAuth && error.response.status === 401) {
                if(retry) {
                    await authService.refresh();
                    return await makeRequest(method, url, data, true, false);
                } else {
                    store.dispatch('auth/logout', true)
                }   
            } else if ([500, 408, 502].includes(error.response.status)) {
                throw TOTAL_ERROR;
            } else if (error.response.status === 429) {
                throw TO_MANY_REQUESTS;
            } else {
                throw error;
            }
        } else {
            if (error.code === "ECONNABORTED") {
                if(retry) {
                    return await makeRequest(method, url, data, useAuth, false);
                } else {
                    throw TIMEOUT_ERROR;
                }
            }
            throw TOTAL_ERROR;
        }
    } finally {
        store.dispatch('loading/hide');
    }
}

export default makeRequest;

function authHeader() {
    const access = JSON.parse(localStorage.getItem('access'));
    if (access) {
        return {
            Authorization: 'Bearer ' + access,
            'ngrok-skip-browser-warning': '69420'
        };
    } else {
        return {
            'ngrok-skip-browser-warning': '69420'
        };
    }
}
import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from './auth.service'
import store from '../store/store'

const API_URL = config.apiURL;

export const LKService = {changeUserData}

async function changeUserData(data) {
    return new Promise((resolve, reject) => {
        axios.put(API_URL + `personal_cabinet/`, data, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return changeUserData(data).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        })
    })
}
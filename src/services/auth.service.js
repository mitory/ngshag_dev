import instance from './axios_settings';
import { router } from '../router/router'
import store from '../store/store';

export const authService = {
    login, logout, refresh
}

function login(user) {
    return instance
        .post('login/', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.access) {
                return response.data.access
            } else {
                throw "Что-то пошло не так...";
            }
        },
            error => {
                if (error.response) {
                    throw error.response.data.error;
                } else {
                    throw 'Сервер не отвечает'
                }
                
            });
}

async function refresh() {
        try {
            const response = await instance.post('refresh/');
            if (response.data.access) {
                localStorage.setItem('access', JSON.stringify(response.data.access));
                return true;
            } else {
                store.dispatch('auth/logout', true)
            }
        } catch (error) {
            store.dispatch('auth/logout', true)
        }

}

function logout(redirect = false) {
    instance.post('logout/')
        .catch( error => {
            console.log(error)
        })
        .finally(() => {
            if (redirect) {
                router.push("/login");
            }
        });

}
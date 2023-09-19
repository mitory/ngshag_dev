import axios from 'axios';
import config from '../config'

export const authService = {
    login, logout, register, refresh
}

const API_URL = config.apiURL;
console.log(API_URL)

function login(user) {
    return axios
        .post(API_URL + 'login/', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log(response.data)
                return true
            } else {
                throw "Токен не найден";
            }
        },
            error => {
                throw error.response.data.detail;
            });
}

function refresh() {
    const tokens = JSON.parse(localStorage.getItem('user'));
    if (tokens) {
        return axios.post(API_URL + 'refresh/', {
            refresh: tokens.refresh
        }).then(response => {
            if (response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return true;
            } else {
                throw 'Ошибка авторизации'
            }
        },
            error => {
                throw error.response.data.detail;
            });
    }

}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(API_URL + 'register/', {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        birth_date: user.birth_date,
        sex: user.sex,
        institution: user.current_university,
        faculty: user.current_faculty,
        specialty: user.current_specialty,
        phone_number: user.phone_number
    }).then(() => {
        return { status: true, message: 'Регистрация прошла успешно' };

    }).catch(err => {
        return { status: false, message: err.response.data.error }
    });
}
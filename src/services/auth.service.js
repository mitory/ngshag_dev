import axios from 'axios';
import config from '../config'
import authHeader from './auth-header';

export const authService = {
    login, logout, register, refresh, sendEducationReport
}

const API_URL = config.apiURL;

function login(user) {
    return axios
        .post(API_URL + 'login/', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return true
            } else {
                throw "Что-то пошло не так...";
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
                return false
            }
        }).catch(() => {
            return false
        });
    }

}

function logout() {
    localStorage.removeItem('user');
}

function sendEducationReport(source){
    return  axios.post(API_URL + `education_report/`, {
        source: source}, {headers: authHeader()
    }).then(()=>{
        return { status: true, message: 'Данные об отсутствующем учебном заведении отправлены' };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            if (refresh()) {
                return sendEducationReport(source);
            }
        } else {
            return { status: false, message: error.response.data.detail }
        }
    });
}

function register(user) {
    return axios.post(API_URL + 'register/', {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        sex: user.sex,
        birth_date: '1000-01-01',
        institution: user.current_university,
        faculty: user.current_faculty,
        specialty: user.current_specialty,
        phone_number: user.phone_number,
        year: user.year,
    }).then(() => {
        return { status: true, message: 'Регистрация прошла успешно' };

    }).catch(err => {
        return { status: false, message: err.response.data.email }
    });
}
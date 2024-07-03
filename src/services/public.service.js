import axios from 'axios';
import config from '../config'
import authHeader from './auth-header';

const API_URL = config.apiURL;

export const publicService = {
    getActualEventsList, getEvent, sendSourse, getSendEmailForChangePass, getNominations, getNews,
    getMainMessge, getPageContent, getNominationsFromEvent, getSchedule, getEducationType, checkEmail,
    genPass
};

async function genPass(){
    try {
        const response = await axios.get(API_URL + 'gen_pass/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data.password;
    } catch (err) {
        return false;
    }
}

//УБРАТЬ
async function getEducationType() {
    try {
        const response = await axios.get(API_URL + 'education_type/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return { text: "Что-то пошло не так...Попробуйте обновить страницу!" }
    }
}

async function getSchedule() {
    try {
        const response = await axios.get(API_URL + 'schedule/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return { text: "Что-то пошло не так...Попробуйте обновить страницу!" }
    }
}

async function getPageContent(name) {
    try {
        const response = await axios.get(API_URL + 'page_static/' + name + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return { content: "Что-то пошло не так...Попробуйте обновить страницу!" }
    }
}

async function getMainMessge() {
    try {
        const response = await axios.get(API_URL + 'main_message/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data[0];
    } catch (err) {
        return { text: "Что-то пошло не так...Попробуйте обновить страницу!" }
    }
}

async function getActualEventsList() {
    try {
        const response = await axios.get(API_URL + 'event_actual/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        this.$store.dispatch('alert/sendMessage', { message: 'Не удалось получить мероприятия', type: 'Danger' });
    }
}

async function getSendEmailForChangePass(email) {
    try {
        const response = await axios.get(API_URL + 'reset_password/' + email + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        if(err.response.status !== 500){
             return { ok: 'no', message: err.response.data.Error }
        } else {
            return { ok: 'no', message: 'Сервер не отвечает, попробуйте позднее' }
        }
       
    }
}

function checkEmail(email, state_autorize) {

    const head = state_autorize ? authHeader(): { 'ngrok-skip-browser-warning': '69420' };

    return new Promise((resolve) => {
        axios.post(API_URL + `check_email/`, {
            email: email,
        }, {
            headers: head
        }).then(() => {
            resolve({ status: true });
        }).catch(error => {
            if (error.response && error.response.status === 500) {
                resolve({ status: false, message: 'Сервер не отвечает, попробуйте позднее' })
            } else {
                resolve({ status: false, message: error.response.data.message })
            }
        });
    })
}

async function getNews(page_size = 1, page = 1) {
    console.log(API_URL)
    try {
        const response = await axios.get(API_URL + 'news/' + '?page=' + page + '&page_size=' + page_size, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return { message: err.response.data.Error }
    }
}

async function getNominations() {
    try {
        const response = await axios.get(API_URL + 'nomination/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return { message: err.response.data.Error }
    }
}

async function getNominationsFromEvent(id_event) {
    try {
        const response = await axios.get(API_URL + 'nomination/' + id_event + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return err
    }
}

async function getEvent(id_event) {
    try {
        const response = await axios.get(API_URL + 'event/' + id_event + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        return err
    }
}

async function sendSourse(source) {
    try {
        const response = await axios.get(API_URL + 'qr/?source=' + source, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response;
    } catch (err) {
        console.log(err)
    }
}
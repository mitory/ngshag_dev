import axios from 'axios';
import config from '../config'

const API_URL = config.apiURL;

export const publicService = {
    getEventsList, getEvent, sendSourse, getSendEmailForChangePass
};

async function getEventsList() {
    try {
        const response = await axios.get(API_URL + 'event/', {
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
        return { ok: 'no', message: err.response.data.Error }
    }
}

async function getEvent(id_event) {
    try {
        const response = await axios.get(API_URL + 'event/' + id_event + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        this.$store.dispatch('alert/sendMessage', { message: 'Не удалось получить информацию по мероприятию', type: 'Danger' });
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
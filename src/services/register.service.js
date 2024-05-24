import axios from 'axios';
import config from '../config'

const API_URL = config.apiURL;

export const registerService = {
    getEducationType, getUnivers, getFacults, getSpecialty
};

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

async function getUnivers(id) {
    try {
        const response = await axios.get(API_URL + 'institutions/' + id + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        this.$store.dispatch('alert/sendMessage', { message: 'Не удалось получить ответ от сервера', type: 'Danger' })
    }
}

async function getFacults(id) {
    const response = await axios.get(API_URL + `faculties/${id}/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    return response.data;
}


async function getSpecialty(id_inst, id_facult) {
    const response = await axios.get(API_URL + `specialty/${id_inst}/${id_facult}/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    return response.data;
}
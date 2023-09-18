import axios from 'axios';
import config from '../config'

const API_URL = config.apiURL;

export const publicService = {
    getEventsList, getEvent
};

async function getEventsList() {
    try {
        const response = await axios.get(API_URL + 'event/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        alert(err);
    }
}

async function getEvent(id_event) {
    try {
        const response = await axios.get(API_URL + 'event/' + id_event + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        alert(err);
    }
}
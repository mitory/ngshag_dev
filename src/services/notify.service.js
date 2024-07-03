import { ref } from 'vue';
import axios from 'axios'
import config from '../config'
import authHeader from './auth-header';
import { authService } from './auth.service'
import store from '../store/store'

const API_WS = config.wsURL;
const API_URL = config.apiURL;

export const notifyService = {
    useNotifications, getNotify, putNotify
};


function useNotifications(token) {

    const notifications = ref([]);

    const socket = new WebSocket(API_WS + 'notifications/' + `?token=${token}`);

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if(data.action){
            if (data.action === 'delete') {
                notifications.value = notifications.value.filter(n => n.id !== data.notification_id);
            }
            if (data.action === 'update') {
                notifications.value = []
            }
        } else {
            notifications.value.unshift(data);
            store.dispatch('alert/sendMessage', { message: 'Пришло новое уведомление', type: 'Success' })
            console.log(event)
        }
        
    };

    socket.onclose = function(event) {
        if (event.wasClean && event.code === 4001) {
            authService.refresh().then(response => {
                if (response) {
                    store.dispatch("notify/start")
                } else {
                    store.dispatch('auth/logout', true);
                }
            })
        } else {
            store.dispatch("notify/stop")
        }
      };

    return {
        notifications
    };
}


//Добавить refresh
async function getNotify(){
    try {
        const response = await axios.get(API_URL + 'notifications/', {headers: authHeader()});
        return response.data.reverse();
    } catch (error) {
        if (error.response && error.response.status === 401) {
            authService.refresh().then(response => {
                if (response) {
                    return getNotify();
                } else {
                    store.dispatch('auth/logout', true);
                }
            })
        } else {
            throw 'error'
        }
    }
}

async function putNotify(){
    return new Promise((resolve, reject) => {
        axios.put(API_URL + 'notifications/', null,
            {
                headers: authHeader()
            }).then(response => {
                resolve(response.data);

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return putNotify().then(data => resolve(data))
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else {
                    reject(false)
                }
            });
    })
}
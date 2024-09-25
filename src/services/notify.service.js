import { ref } from 'vue';
import config from '../config';
import { authService } from './auth.service';
import store from '../store/store';
import makeRequest from './base_request';

const API_WS = config.wsURL;

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
        }
        
    };

    socket.onclose = async function(event) {
        if (event.wasClean && event.code === 4001) {
            await authService.refresh()
            store.dispatch("notify/start")
        } else {
            store.dispatch("notify/stop")
        }
      };

    return {
        notifications
    };
}


async function getNotify() {
    return (await makeRequest('get', 'notifications/')).reverse();
}
async function putNotify() {
    return makeRequest('put', 'notifications/');
}
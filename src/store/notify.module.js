import { notifyService } from '../services/notify.service';

export const notify = {
    namespaced: true,
    state: {
        status: false,
        new_notifications: [],
        old_notifications: [],
        is_show_menu: false
    },
    mutations: {
        start(state, start_state) {
            state.status = start_state.status;
            state.new_notifications = start_state.notifications;
            state.old_notifications = start_state.old_notifications;
        },
        failur(state) {
            state.status = false;
            state.new_notifications = [];
            state.old_notifications = [];
            state.is_show_menu = false;
        },
        update_old_notify(state, data){
            state.old_notifications = data;
        },
        change_show_menu(state) {
            state.is_show_menu = !state.is_show_menu;
        },
        set_show_menu(state, status) {
            state.is_show_menu = status;
        }
    },
    actions: {
        change_show({commit}){
            commit('change_show_menu')
        }, 
        set_show({commit}, status){
            commit('set_show_menu', status)
        }, 
        stop({commit}) {
            commit('failur')
        },
        async start({ commit }) {
            try {
                const old_notifications = await notifyService.getNotify();
                
                const user = JSON.parse(localStorage.getItem('user'));
                const { notifications } = notifyService.useNotifications(user.access);
                
                commit('start', {
                    status: true, 
                    notifications: notifications, 
                    old_notifications: old_notifications
                });
            } catch(err) {
                commit('failur')
            }
        },
        async updateOldNotify({ commit }) {
            try {
                await notifyService.putNotify();
                const old_notifications = await notifyService.getNotify();
                commit('update_old_notify', old_notifications)
            } catch(err){
                commit('failur')
            }
        }
    }
};
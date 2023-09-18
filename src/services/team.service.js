import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'

const API_URL = config.apiURL;


export const teamService = {
    registerTeam, invitingTeam
};

async function invitingTeam(code) {
    try {
        await axios
            .post(API_URL + 'team_join/',
                {
                    invitation_code: code
                },
                {
                    headers: authHeader(),
                })
        return { message: 'Вы присоединились к команде!', status: true }
    } catch (err) {
        if (err.response.status == 401) {
            alert('Пользователь не авторизован')
            return { message: 'Пользователь не авторизован', status: false }
        } else {
            return { message: err.response.data.error, status: false }
        }
    }
}
// 00c67d6198

async function registerTeam(team, event_id) {
    try {
        await axios
            .post(API_URL + 'team_create/',
                {
                    name: team.team_name,
                    team_password: team.team_password,
                    event_id: event_id
                },
                {
                    headers: authHeader(),
                })
        return { message: 'Регистрация команды прошла успешно', status: true }
    } catch (err) {
        if (err.response.status == 401) {
            alert('Пользователь не авторизован')
            return { message: 'Пользователь не авторизован', status: false }
        } else {
            return { message: err.response.data.error, status: false }
        }

    }

}

// }, () => {
//     return authService.refresh().then(() => {
//         return getLkInfo()
//     }).catch(() => {
//         this.$store.dispatch('auth/logout')
//         return false
//     })
// }
// ).catch(() => {
//     this.$store.dispatch('auth/logout')
//     return false
// });
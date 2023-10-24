import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from '../services/auth.service'

const API_URL = config.apiURL;


export const teamService = {
    registerTeam, invitingTeam, getTeam
};

async function invitingTeam(code) {
    return new Promise((resolve, reject) => {
        axios
            .post(API_URL + 'team_join/',
                {
                    invitation_code: code
                },
                {
                    headers: authHeader(),
                }).then(() => {
                    resolve({ message: 'Вы присоединились к команде!', status: true })
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        authService.refresh().then(response => {
                            if (response) {
                                return invitingTeam(code).then(data => resolve(data))
                                    .catch(error => reject(error));
                            } else {
                                this.$store.dispatch('auth/logout', true);
                            }
                        })
                    } else if (error.response && [400, 403].includes(error.response.status)) {
                        console.log('yes')
                        reject({ status: 400, error: error.response.data.error })
                    } else {
                        console.log('no')
                        reject(error);
                    }
                })

    })
}

async function getTeam(id_team) {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + 'team_detail/' + id_team + '/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve({ data: response.data, status: true });

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getTeam(id_team).then(data => resolve(data))
                                .catch(error => reject(error));
                        } else {
                            this.$store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && error.response.status === 404) {
                    reject({ status: 404, error: error.response.data.error })
                } else {
                    reject(error);
                }
            })
    })
}

async function registerTeam(team, event_id) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + `team_create/`, {
            name: team.team_name,
            team_password: team.team_password,
            event_id: event_id
        }, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return registerTeam(team, event_id).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else if (error.response && [400, 403].includes(error.response.status)) {
                reject({ status: 400, error: error.response.data.error })
            } else {
                reject(error);
            }
        })

    })
}

// try {
    //     await axios
    //         .post(API_URL + 'team_create/',
    //             {
    //                 name: team.team_name,
    //                 team_password: team.team_password,
    //                 event_id: event_id
    //             },
    //             {
    //                 headers: authHeader(),
    //             })
    //     return { message: 'Регистрация команды прошла успешно', status: true }
    // } catch (err) {
    //     if (err.response.status == 401) {
    //         return { message: 'Пользователь не авторизован', status: false }
    //     } else {
    //         return { message: err.response.data.error, status: false }
    //     }

    // }
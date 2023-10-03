import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from './auth.service'
// import store from '../store/store'
// import router from '../router/router'

const API_URL = config.apiURL;

export const userService = {
    getLkInfo, getUnivers, getFacults, getTeams, getSpecialty, getSkills, postSkills
};

async function getTeams() {
    return axios.get(API_URL + 'view_teams/', {
        headers: authHeader()
    }).then(response => {
        return { data: response.data, status: true };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return getLkInfo();
            } else {
                this.$store.dispatch('auth/logout');
            }
        } else {
            return { message: error.response.data.error, status: false }
        }
    });
}

// async function getTeam(id_team) {
//     console.log(id_team)
//     return axios.get(API_URL + 'team_detail/' + id_team + '/',
//         {
//             headers: authHeader(),
//         }).then(response => {
//             return { data: response.data, status: true };

//         }).catch(err => {
//             if (err.response.status == 401) {
//                 alert('Пользователь не авторизован')
//                 return { message: 'Пользователь не авторизован', status: false }
//             } else {
//                 return { message: err.response.data.error, status: false }
//             }
//         })
// }


async function getUnivers() {
    try {
        const response = await axios.get(API_URL + 'institutions/', {
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

async function getSkills() {
    const response = await axios.get(API_URL + `skill/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    return response.data;
}

async function postSkills(skills) {
    try {
        const response = await axios.post(API_URL + `skill/`, { categories: skills }, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return postSkills(skills);
            } else {
                this.$store.dispatch('auth/logout');
            }
        } else {
            throw error;
        }
    }
}

// async function invitingTeam(code) {
//     try {
//         await axios
//             .post(API_URL + 'team_join/',
//                 {
//                     invitation_code: code
//                 },
//                 {
//                     headers: authHeader(),
//                 })
//         return { message: 'Вы присоединились к команде!', status: true }
//     } catch (err) {
//         if (err.response.status == 401) {
//             alert('Пользователь не авторизован')
//             return { message: 'Пользователь не авторизован', status: false }
//         } else {
//             return { message: err.response.data.error, status: false }
//         }
//     }
// }

function getLkInfo() {
    return axios
        .get(API_URL + 'personal_cabinet/',
            {
                headers: authHeader()
            }).then(response => {
                return response.data
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    if (authService.refresh()) {
                        return getLkInfo();
                    } else {
                        this.$store.dispatch('auth/logout');
                    }
                } else {
                    return { error: error.response.data.error };
                }
            });
}

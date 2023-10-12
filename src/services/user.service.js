import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from './auth.service'
// import store from '../store/store'
// import router from '../router/router'

const API_URL = config.apiURL;

export const userService = {
    getLkInfo, getUnivers, getFacults, getTeams,
    getSpecialty, getSkills, postSkills, getVerificeAcc,
    changePassword, sendEducationReport, getTasks, getTask,
    postTaskFile, getTaskStatus
};

function sendEducationReport(source) {
    return axios.post(API_URL + `education_report/`, {
        source: source
    }, {
        headers: authHeader()
    }).then(() => {
        return { status: true, message: 'Данные об отсутствующем учебном заведении отправлены' };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return sendEducationReport(source);
            } else {
                this.$store.dispatch('auth/logout', true);
            }
        } else {
            return { status: false, message: error.response.data.detail }
        }
    });
}

async function getTeams() {
    return axios.get(API_URL + 'view_teams/', {
        headers: authHeader()
    }).then(response => {
        return { data: response.data, status: true };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return getTeams();
            } else {
                this.$store.dispatch('auth/logout', true);
            }
        } else {
            return { message: error.response.data.error, status: false }
        }
    });
}

async function getTasks() {
    return axios.get(API_URL + 'task/', {
        headers: authHeader()
    }).then(response => {
        return { data: response.data, status: true };
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return getTasks();
            } else {
                this.$store.dispatch('auth/logout', true);
            }
        } else {
            return { message: error.response.data.error, status: false }
        }
    });
}

async function getTask(id_task) {
    return axios.get(API_URL + 'task/' + id_task + '/',
        {
            headers: authHeader(),
        }).then(response => {
            return { data: response.data, status: true };

        }).catch(error => {
            if (error.response && error.response.status === 401) {
                if (authService.refresh()) {
                    return getTask(id_task);
                } else {
                    this.$store.dispatch('auth/logout', true);
                }
            } else {
                return { message: error.response.data.error, status: false }
            }
        });
}

async function getTaskStatus(id_task) {
    return axios.get(API_URL + 'task_status/' + id_task + '/',
        {
            headers: authHeader(),
        }).then(response => {
            return { data: response.data, status: true };

        }).catch(error => {
            if (error.response && error.response.status === 401) {
                if (authService.refresh()) {
                    return getTask(id_task);
                } else {
                    this.$store.dispatch('auth/logout', true);
                }
            } else if (error.response && error.response.status === 404) {
                return { status: true }
            } else {
                return { message: error.response.data.error, status: false }
            }
        });
}

async function postTaskFile(formData) {
    try {
        const response = await axios.post(API_URL + `task/`, formData, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return postTaskFile(formData);
            } else {
                this.$store.dispatch('auth/logout', true);
            }
        } else {
            throw error;
        }
    }
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

async function getVerificeAcc(id, token) {
    const response = await axios.get(API_URL + `activate/${id}/${token}/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    return response.data;
}

async function changePassword(old_pass, new_pass) {
    try {
        const response = await axios.put(API_URL + `change_password/`, {
            current_password: old_pass,
            new_password: new_pass
        }, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            if (authService.refresh()) {
                return changePassword(old_pass, new_pass);
            } else {
                this.$store.dispatch('auth/logout', true);
            }
        } else {
            throw error;
        }
    }
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
                this.$store.dispatch('auth/logout', true);
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
                        this.$store.dispatch('auth/logout', true);
                    }
                } else {
                    return { error: error.response.data.error };
                }
            });
}

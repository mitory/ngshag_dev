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
    postTaskFile, getTaskStatus, putTaskFile, getFile
};

function sendEducationReport(source) {
    return new Promise((resolve) => {
        axios.post(API_URL + `education_report/`, {
            source: source
        }, {
            headers: authHeader()
        }).then(() => {
            resolve({ status: true, message: 'Данные об отсутствующем учебном заведении отправлены' });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return getTasks().then(data => resolve(data))
                            .catch(error => resolve(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                resolve({ status: false, message: error.response.data.detail })
            }
        });
    })
}

async function getTeams() {
    return new Promise((resolve) => {
        axios.get(API_URL + 'view_teams/', {
            headers: authHeader()
        }).then(response => {
            resolve({ data: response.data, status: true });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return getTasks().then(data => resolve(data))
                            .catch(error => resolve(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                resolve({ message: error.response.data.error, status: false })
            }
        });
    })
}

async function getTasks() {
    return new Promise((resolve) => {
        axios.get(API_URL + 'task/', {
            headers: authHeader()
        }).then(response => {
            resolve({ data: response.data, status: true });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return getTasks().then(tasksData => resolve(tasksData))
                            .catch(error => resolve(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                resolve({ message: error.response.data.error, status: false })
            }
        });
    })
}

async function getTask(id_task) {
    return new Promise((resolve) => {
        axios.get(API_URL + 'task/' + id_task + '/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve({ data: response.data, status: true });

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getTask(id_task).then(data => resolve(data))
                                .catch(error => resolve(error));
                        } else {
                            this.$store.dispatch('auth/logout', true);
                        }
                    })
                } else {
                    resolve({ message: error.response.data.error, status: false })
                }
            });
    })
}

async function getFile(id_task) {
    return new Promise((resolve) => {
        axios.get(API_URL + 'download-file/' + id_task + '/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve({ data: response.data, status: true });

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getTask(id_task).then(data => resolve(data))
                                .catch(error => resolve(error));
                        } else {
                            this.$store.dispatch('auth/logout', true);
                        }
                    })
                } else {
                    resolve({ message: error.response.data.error, status: false })
                }
            });
    })
}

async function getTaskStatus(id_task) {
    return new Promise((resolve) => {
        axios.get(API_URL + 'task_status/' + id_task + '/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve({ data: response.data, status: true });

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getTaskStatus(id_task).then(data => resolve(data))
                                .catch(error => resolve(error));
                        } else {
                            this.$store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && error.response.status === 404) {
                    resolve({ status: false })
                } else {
                    resolve({ message: error.response.data.error, status: false })
                }
            });

    })
}

async function postTaskFile(formData) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + `task/`, formData, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return postTaskFile(formData).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        })

    })
}

async function putTaskFile(formData) {
    return new Promise((resolve, reject) => {

        axios.put(API_URL + `task/`, formData, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return putTaskFile(formData).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        });

    })
}

async function changePassword(old_pass, new_pass) {
    return new Promise((resolve, reject) => {
        axios.put(API_URL + `change_password/`, {
            current_password: old_pass,
            new_password: new_pass
        }, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return changePassword(old_pass, new_pass).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        })
    })
}

async function postSkills(skills) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + `skill/`, { categories: skills }, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return postSkills(skills).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        this.$store.dispatch('auth/logout', true);
                    }
                })
            } else if (error.response && error.response.status === 403) {
                reject({ status: 403, error: error.response.data.error })
            } else {
                reject(error);
            }
        })

    })
}

function getLkInfo() {
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL + 'personal_cabinet/',
                {
                    headers: authHeader()
                }).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        authService.refresh().then(response => {
                            if (response) {
                                return getLkInfo().then(data => resolve(data))
                                    .catch(error => reject(error));
                            } else {
                                this.$store.dispatch('auth/logout', true);
                            }
                        })
                    } else {
                        reject({ error: error.response.data.error });
                    }
                });
    })
}


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



import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from './auth.service'
import store from '../store/store'
// import router from '../router/router'

const API_URL = config.apiURL;

export const userService = {
    getLkInfo, getUnivers, getFacults, getTeams,
    getSpecialty, getSkills, postSkills, getVerificeAcc,
    changePassword, sendEducationReport, getTasks, getTask,
    postTaskFile, getTaskStatus, putTaskFile, getFile, postUserNomination,
    deleteUserNomination, getUserNomination, getUserEventStageList, getTasksFromNomination,
    getUserNominations, getTaskStatusAll
};

async function getUserNomination(id_nom) {
    const param = id_nom ? `?nomination_id=${id_nom}`: '';
    return new Promise((resolve, reject) => {
        axios.get(API_URL + 'event_user/' + param,
            {
                headers: authHeader(),
            }).then(response => {
                resolve(response.data);

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getUserNomination(id_nom).then(data => resolve(data))
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && [400, 403].includes(error.response.status)) {
                    reject({ error: error.response.data.error, status: error.response.status })
                } else {
                    reject(false)
                }
            });
    })
}

function getUserNominations(event_id){
    const param = event_id ? `?event=${event_id}`: '';
    return new Promise((resolve) => {
        axios.get(API_URL + 'event_all/' + param, {
            headers: authHeader()
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return getUserNominations(event_id).then(data => resolve(data))
                            .catch(error => resolve(error));
                    } else {
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                resolve(error)
            }
        });
    })
}

function sendEducationReport(source, category, token) {
    return new Promise((resolve) => {
        axios.post(API_URL + `education_report/`, {
            source: source,
            category: category,
            recaptchaToken: token
        }, {
            headers: authHeader()
        }).then(() => {
            resolve({ status: true, message: 'Данные об отсутствующем учебном заведении отправлены' });
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return sendEducationReport(source, category).then(data => resolve(data))
                            .catch(error => resolve(error));
                    } else {
                        store.dispatch('auth/logout', true);
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
                        return getTeams().then(data => resolve(data))
                            .catch(error => resolve(error));
                    } else {
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                resolve({ message: error.response.data.error, status: false })
            }
        });
    })
}

async function getTasks() {
    return new Promise((resolve, reject) => {
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
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject({ message: error.response.data.error, status: false })
            }
        });
    })
}

async function getTask(id_task) {
    return new Promise((resolve, reject) => {
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
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && error.response.status == 404) {
                    reject({ error: error.response.data.error, status: 404 })
                } else {
                    reject({ status: false })
                }
            });
    })
}

async function getFile(id_task) {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + 'download-file/' + id_task + '/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve(response.data);

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getFile(id_task).then(data => resolve(data))
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

async function getTaskStatusAll() {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + 'task_status_all/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve(response.data);

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getTaskStatusAll().then(data => resolve(data))
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && error.response.status === 404) {
                    reject(false)
                } else {
                    reject(false)
                }
            });

    })
}

async function getTaskStatus(id_task) {
    return new Promise((resolve, reject) => {
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
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response && error.response.status === 404) {
                    reject({ status: false })
                } else {
                    reject({ message: error.response.data.error, status: false })
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
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        })

    })
}

// async function postUserEvent(id_event) {
//     return new Promise((resolve, reject) => {
//         axios.post(API_URL + `event_user/`, { event: id_event }, {
//             headers: authHeader(),
//         }).then(response => {
//             resolve(response.data);
//         }).catch(error => {
//             if (error.response && error.response.status === 401) {
//                 authService.refresh().then(response => {
//                     if (response) {
//                         return postUserEvent(id_event).then(data => resolve(data))
//                             .catch(error => reject(error));
//                     } else {
//                         store.dispatch('auth/logout', true);
//                     }
//                 })
//             } else if (error.response && [400, 403].includes(error.response.status)) {
//                 reject({ status: 400, error: error.response.data.error })
//             } else {
//                 reject(error);
//             }
//         })

//     })
// }

async function postUserNomination(id_nom) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + `event_user/`, { nomination: id_nom }, {
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return postUserNomination(id_nom).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        store.dispatch('auth/logout', true);
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

async function getUserEventStageList() {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + 'event_stage/',
            {
                headers: authHeader(),
            }).then(response => {
                resolve({ data: response.data });

            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    authService.refresh().then(response => {
                        if (response) {
                            return getUserEventStageList().then(data => resolve(data))
                                .catch(error => reject(error));
                        } else {
                            store.dispatch('auth/logout', true);
                        }
                    })
                } else if (error.response) {
                    reject({ error: error.response.data.error, status: error.response.status })
                } else {
                    reject({ status: false })
                }
            });
    })
}

async function deleteUserNomination(id_nom) {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL + `event_user/`, {
            data: { nomination: id_nom },
            headers: authHeader(),
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                authService.refresh().then(response => {
                    if (response) {
                        return deleteUserNomination(id_nom).then(data => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        store.dispatch('auth/logout', true);
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
                        store.dispatch('auth/logout', true);
                    }
                })
            } else {
                reject(error);
            }
        });

    })
}

async function changePassword(old_pass, new_pass, token) {
    return new Promise((resolve, reject) => {
        axios.put(API_URL + `change_password/`, {
            current_password: old_pass,
            new_password: new_pass,
            recaptchaToken: token
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
                        store.dispatch('auth/logout', true);
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
                        store.dispatch('auth/logout', true);
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
                                store.dispatch('auth/logout', true);
                            }
                        })
                    } else {
                        reject({ error: error.response.data.error });
                    }
                });
    })
}

// УБРАТЬ
async function getUnivers(id) {
    try {
        const response = await axios.get(API_URL + 'institutions/' + id + '/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        store.dispatch('alert/sendMessage', { message: 'Не удалось получить ответ от сервера', type: 'Danger' })
    }
}

//Убрать
async function getFacults(id) {
    const response = await axios.get(API_URL + `faculties/${id}/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    return response.data;
}
//Убрать
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

async function getTasksFromNomination(id, stage) {
    const response = await axios.get(API_URL + `nomination_programs/${id}/${stage}/`, {
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
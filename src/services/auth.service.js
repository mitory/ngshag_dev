import axios from 'axios';
import config from '../config'
import { router } from '../router/router'
import store from '../store/store';

export const authService = {
    login, logout, register, refresh
}

const API_URL = config.apiURL;

function login(user) {
    return axios
        .post(API_URL + 'login/', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return true
            } else {
                throw "Что-то пошло не так...";
            }
        },
            error => {
                throw error.response.data.error;
            });
}

async function refresh() {
    const tokens = JSON.parse(localStorage.getItem('user'));
    if (tokens) {
        try {
            const response = await axios.post(API_URL + 'refresh/', {
                refresh: tokens.refresh
            });
            if (response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return true;
            } else {
                store.dispatch('auth/logout', true)
                // logout()
            }
        } catch {
            store.dispatch('auth/logout', true)
            // logout()
        }
    } else {
        store.dispatch('auth/logout', true)
        // logout()
    }

}

function logout(redirect = false) {
    localStorage.removeItem('user');
    localStorage.removeItem('user_data');
    if (redirect) {
        router.push("/");
    }

}

// try {
//     const response = await axios.put(API_URL + `task/`, formData, {
//         headers: authHeader(),
//     });
//     return response.data;
// } catch (error) {
//     if (error.response && error.response.status === 401) {
//         if (authService.refresh()) {
//             const value = setTimeout(putTaskFile(formData), 2000);
//             return value
//         } else {
//             this.$store.dispatch('auth/logout', true);
//         }
//     } else {
//         throw error;
//     }
// }

// function refresh() {
//     const tokens = JSON.parse(localStorage.getItem('user'));
//     if (tokens) {
//         return axios.post(API_URL + 'refresh/', {
//             refresh: tokens.refresh
//         }).then(response => {
//             if (response.data.access) {
//                 localStorage.setItem('user', JSON.stringify(response.data));
//                 return true;
//             } else {
//                 return false
//             }
//         }).catch(() => {
//             return false
//         });
//     }

// }

// function register(user) {
//     return axios.post(API_URL + 'register/', {
//         email: user.email,
//         password: user.password,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         middle_name: user.middle_name,
//         sex: user.sex,
//         birth_date: '1000-01-01',
//         institution: user.currentInst,
//         faculty: user.currentFacult,
//         specialty: user.currentSpec,
//         phone_number: user.phone_number,
//         year: user.year,
//     }).then(() => {
//         return { status: true, message: 'Регистрация прошла успешно' };

//     }).catch(err => {
//         return { status: false, message: err.response.data }
//     });
// }

async function register(user) {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + 'register/', {
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            sex: user.sex,
            birth_date: '1000-01-01',
            institution: user.currentInst,
            faculty: user.currentFacult,
            specialty: user.currentSpec,
            phone_number: user.phone_number,
            year: user.year,
        }).then(() => {
            resolve({ status: true, message: 'Регистрация прошла успешно' });
        }).catch(error => {
            if (error.response && error.response.status === 500) {
                reject({ status: true, 
                            message: 'Похоже, что на сервере неполадки, пожалуйста, попробуйте позднее'
                        });
            } else {
                reject({ status: false, message: error.response.data });
            }
        })

    })
}
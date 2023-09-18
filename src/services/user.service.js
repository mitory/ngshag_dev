import axios from 'axios';
import authHeader from './auth-header';
import config from '../config'
import { authService } from './auth.service'

const API_URL = config.apiURL;

export const userService = {
    getLkInfo, getUnivers, getFacults, getTeams, getTeam
};

async function getTeams() {
    return axios.get(API_URL + 'view_teams/', {
        headers: authHeader()
    }).then(response => {
        return { data: response.data, status: true };
    }).catch(err => {
        if (err.response.status == 401) {
            alert('Пользователь не авторизован')
            return { message: 'Пользователь не авторизован', status: false }
        } else {
            return { message: err.response.data.error, status: false }
        }
    });
}

async function getTeam(id_team) {
    console.log(id_team)
    return axios.get(API_URL + 'team_detail/' + id_team + '/',
        {
            headers: authHeader(),
        }).then(response => {
            return { data: response.data, status: true };

        }).catch(err => {
            if (err.response.status == 401) {
                alert('Пользователь не авторизован')
                return { message: 'Пользователь не авторизован', status: false }
            } else {
                return { message: err.response.data.error, status: false }
            }
        })
}


async function getUnivers() {
    try {
        const response = await axios.get(API_URL + 'institutions/', {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        return response.data;
    } catch (err) {
        alert(err);
    }
}

async function getFacults(id) {
    console.log(`faculties/${id}`)
    const response = await axios.get(API_URL + `faculties/${id}/`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
    });
    console.log(response.data);
    return response.data;
}

function getLkInfo() {
    return axios
        .get(API_URL + 'personal_cabinet/',
            {
                headers: authHeader()
            }).then(response => {
                return response.data
            }, () => {
                return authService.refresh().then(() => {
                    return getLkInfo()
                }).catch(() => {
                    this.$store.dispatch('auth/logout')
                    return false
                })
            }
            ).catch(() => {
                this.$store.dispatch('auth/logout')
                return false
            });
}
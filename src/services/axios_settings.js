import axios from 'axios';
import config from '../config'
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: config.apiURL,
    timeout: 5000,
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});
  
export default instance;
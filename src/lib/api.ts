import axios from 'axios';
const { REACT_APP_DJANGO_BASE_URL } = process.env;
const token = localStorage.getItem("user")? localStorage.getItem("user") : "";
export const API_ENDPOINT = process.env.REACT_APP_DJANGO_BASE_URL;
const api = axios.create({
    baseURL: REACT_APP_DJANGO_BASE_URL,
    // timeout: 100000000,
    headers: {
        'Content-type': 'application/json',
       
    }
});
export default api;

if (global.window) {

    (window as any).api = api;
}

import axios from 'axios';

const token = localStorage.getItem("user")? localStorage.getItem("user") : "";
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const apiScaffolder = axios.create({
    // TODO Change Api where appropriate
    baseURL: `http://localhost:50719`,
    // timeout: 100000000,
    headers: {
        'Content-type': 'application/json',
    }
});



export default apiScaffolder;

if (global.window) {
    (window as any).scaffolderApi = apiScaffolder;
}

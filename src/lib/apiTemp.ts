import axios from 'axios';

const token = localStorage.getItem("user")? localStorage.getItem("user") : "";
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const apiTemp = axios.create({
 
    baseURL: `http://localhost:58085`,
  
    headers: {
        'Content-type': 'application/json',
        // 'Authorization': `Token ${token}`
    }
});


export default apiTemp;

if (global.window) {
    (window as any).apiTemp = apiTemp;
}

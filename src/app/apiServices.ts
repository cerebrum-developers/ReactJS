import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { toast } from "react-toastify";

const base: string = process.env.REACT_APP_API_URL as string;
const id = process.env.REACT_APP_ID;

export function registerApi() {
  const client: object = {
    endpoint_name: "register_app",
    client_id: id,
  };
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(base, client, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });
}

export function registerUserApi(data: any) {
  const date = moment(new Date()).format("YYYY-MM-DD");
  const password = CryptoJS.AES.encrypt(
    JSON.stringify((data?.password || "") + id),
    date,
  ).toString();
  const loginUser = {
    endpoint_name: "register_user",
    username: data.username,
    fullname: data.fullname,
    email: data.email,
    password,
  };
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(base, loginUser, config)
      .then((response) => {
        resolve(response);
        toast.success("Registered Sucsessfully");
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });
}

export function loginApi(data: any) {
  const date = moment(new Date()).format("YYYY-MM-DD");
  const password = CryptoJS.AES.encrypt(
    JSON.stringify((data?.password || "") + id),
    date,
  ).toString();
  const loginUser = {
    endpoint_name: "authenticate_user",
    username: data.username,
    password,
  };

  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(base, loginUser, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response?.data);
      });
  });
}

const apiService = {
  registerApi,
  registerUserApi,
  loginApi,
};
export default apiService;

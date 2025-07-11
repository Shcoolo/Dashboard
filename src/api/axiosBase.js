import axios from "axios";
import { getToken } from "../utils/storage";
import { toast } from 'react-toastify';

// axios stacture with base url for all program
const axiosBase = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// include token if he is exists with any request
axiosBase.interceptors.request.use( (config) => {
    const token = getToken();
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
});

// show message of respnse in notification is called toast
axiosBase.interceptors.response.use( 
    response => {
        const { message } = response ||  { message : "Success Response" };
        if(message){
            toast['success'](message);
        }
        return response;
    },
    error => {
        const msg = error?.message || "Error Response";
        toast.error(msg);
        return Promise.reject(error);  
    }
);

export default axiosBase;
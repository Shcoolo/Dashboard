import axios from 'axios';
import { useMutation } from '@tanstack/react-query'

const login = async (data) => {
    try{
        const response = await axios.post('http://127.0.0.1:8000/api/accounts/admin-login/', data);
        // TODO common link http://127.0.0.1:8000/api
        localStorage.setItem('token', response.data?.access_token);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
} 


export const useSendOTP = () => {

  return useMutation({
        mutationFn : login
    });
};
import axios from 'axios';
import { useMutation } from 'react-query';

const loginApi = (data) => async() => {
    
    try{
        const response = await axios.post('http://127.0.0.1/api/login', data);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
} 


export const useLogin = () => {
  return useMutation(loginApi);
};
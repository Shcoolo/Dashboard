import axiosBase from "./Base/axiosBase";

export const login = async (data) => {
    try{
        const response = await axiosBase.post('/accounts/adminsuperuser-login/', data);
        return response.data;
    }
    catch(error){
        // throw error; 
    }
} 

export const getUserProfile = async () => {
    try {
        const response = await axiosBase.get('/accounts/get-info/');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const logout = async () => {
    try{
        const response = await axiosBase.post('/accounts/logout/');
        return response.data;
    }
    catch(error){
        throw error;
    } 
}

export const sendotp = async (data) => {
    try{
        const response = await axiosBase.post('/accounts/send-otp/', data);
        return response.data;
    }
    catch(error){
        throw error;
    } 
}

export const verifyotp = async (data) => {
    try{
        const response = await axiosBase.post('/accounts/verify-otp/', data);
        return response.data;
    }
    catch(error){
        throw error;
    } 
}

export const setPassword = async (data) => {
    try{
        const response = await axiosBase.post('/accounts/set-password/', data);
        return response.data;
    }
    catch(error){
        throw error;
    } 
}
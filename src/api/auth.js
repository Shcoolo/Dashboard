import axiosBase from "./axiosBase";


export const login = async (data) => {
    try{
        const response = await axiosBase.post('/accounts/admin-login/', data);
        return response;
    }
    catch(error){
        console.error(error);
        return error;
    }
} 


export const logout = async () => {

}
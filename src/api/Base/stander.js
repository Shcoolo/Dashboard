import axiosBase from "./Base/axiosBase";



export const index = async () => {
    try{
        const response = await axiosBase.get('//');
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const store = async (data) => {
    try{
        const response = await axiosBase.post('//', data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const show = async (id, data) => {
    try{
        const response = await axiosBase.get(`//${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const update = async (id, data) => {
    try{
        const response = await axiosBase.put(`//${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const deleteFn = async (id) => {
    try{
        const response = await axiosBase.delete(`//${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

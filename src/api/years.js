import axiosBase from "./Base/axiosBase";



export const indexYears = async () => {
    try{
        const response = await axiosBase.get('/academic/years/');
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const storeYear = async (data) => {
    try{
        const response = await axiosBase.post('/academic/years/', data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const showYear = async (id, data) => {
    try{
        const response = await axiosBase.get(`/academic/years/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const updateYear = async (id, data) => {
    try{
        const response = await axiosBase.put(`/academic/years/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const deleteYear = async (id) => {
    try{
        console.log(id);
        const response = await axiosBase.delete(`/academic/years/${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

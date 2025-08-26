import axiosBase from "./Base/axiosBase";



export const indexDaysOfWeek = async () => {
    try{
        const response = await axiosBase.get('/academic/days-of-week/');
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const showDayOfWeek = async (id, data) => {
    try{
        const response = await axiosBase.get(`/academic/days-of-week/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const updateDayOfWeek = async (id, data) => {
    try{
        const response = await axiosBase.patch(`/academic/days-of-week/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

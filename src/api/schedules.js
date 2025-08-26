import axiosBase from "./Base/axiosBase";



export const indexSchedules = async (sectionFilter) => {
    try{
        const response = await axiosBase.get('/schedules/list/', {
            params: { 'section_id': sectionFilter }
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const storeSchedule = async (data) => {
    try{
        const response = await axiosBase.post('/schedules/add/', data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const showSchedule = async (id, data) => {
    try{
        const response = await axiosBase.get(`/schedules/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const updateSchedule = async (id, data) => {
    try{
        const response = await axiosBase.put(`/schedules/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const deleteSchedule = async (id) => {
    try{
        const response = await axiosBase.delete(`/schedules/${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

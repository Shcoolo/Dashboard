import axiosBase from "./Base/axiosBase";



export const indexTasks = async ({subject}) => {
    try{
        const response = await axiosBase.get('/exams/', {
            params: { 'subject_id': subject }
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const storeTask = async (data) => {
    try{
        const response = await axiosBase.post('/exams/', data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const showTask = async (id, data) => {
    try{
        const response = await axiosBase.get(`/exams/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const updateTask = async (id, data) => {
    try{
        const response = await axiosBase.put(`/exams/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const deleteTask = async (id) => {
    try{
        const response = await axiosBase.delete(`/exams/${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const makeTaskDone = async (id, data) => {
    try{
        const response = await axiosBase.patch(`/exams/${id}/conduct/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

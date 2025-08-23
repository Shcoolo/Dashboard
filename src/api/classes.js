import axiosBase from "./Base/axiosBase";

export const indexClasses = async() => {
    try{
        const response = await axiosBase.get(`/class/classes/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeClass = async (data) => {
    try{
        const response = await axiosBase.post(`/class/classes/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showClass = async (classId) => {
    try{
        const response = await axiosBase.get(`/class/classes/${classId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateClass = async (classId, data) => {
    try{
        const response = await axiosBase.put(`/class/classes/${classId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteClass = async (classId) => {
    try{
        const response = await axiosBase.delete(`/class/classes/${classId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
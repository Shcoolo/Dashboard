import axiosBase from "./Base/axiosBase";

export const indexTeachers = async() => {
    try{
        const response = await axiosBase.get(`/teacher/teachers/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeTeacher = async (data) => {
    try{
        const response = await axiosBase.post(`/teacher/teachers/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showTeacher = async (teacherId) => {
    try{
        const response = await axiosBase.get(`/teacher/teachers/${teacherId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateTeacher = async (teacherId, data) => {
    try{
        const response = await axiosBase.put(`/teacher/teachers/${teacherId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteTeacher = async (teacherId) => {
    try{
        const response = await axiosBase.delete(`/teacher/teachers/${teacherId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
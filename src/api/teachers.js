import axiosBase from "./Base/axiosBase";

export const indexTeachers = async() => {
    try{
        const response = await axiosBase.get(`/teachers/show-teachers/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeTeacher = async (data) => {
    try{
        const response = await axiosBase.post(`/accounts/register-teacher/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showTeacher = async (teacherId) => {
    try{
        const response = await axiosBase.get(`/teacher/show-teacher/${teacherId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateTeacher = async (teacherId, data) => {
    try{
        const response = await axiosBase.put(`/teachers/${teacherId}/update-teacher/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteTeacher = async (teacherId) => {
    try{
        const response = await axiosBase.delete(`/teachers/${teacherId}/delete-teacher/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const showTeachersBySubject = async (subjectId) => {
    try{
        const response = await axiosBase.get(`/subject/subjects/${subjectId}/teachers/`);
        return response;
    }
    catch(error){
        throw error;
    }
}
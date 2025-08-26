import axiosBase from "./Base/axiosBase";

export const indexStudents = async() => {
    try{
        const response = await axiosBase.get(`/students/students-list/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeStudent = async (data) => {
    try{
        const response = await axiosBase.post(`/students/add-student/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showStudent = async (studentId) => {
    try{
        const response = await axiosBase.get(`/students/${studentId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateStudent = async (studentId, data) => {
    try{
        const response = await axiosBase.put(`/students/${studentId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteStudent = async (studentId) => {
    try{
        const response = await axiosBase.delete(`/student/${studentId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
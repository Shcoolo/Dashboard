import axiosBase from "./Base/axiosBase";

export const indexSubjects = async() => {
    try{
        const response = await axiosBase.get(`/subject/subjects/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeSubject = async (data) => {
    try{
        const response = await axiosBase.post(`/subject/subjects/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showSubject = async (subjectId) => {
    try{
        const response = await axiosBase.get(`/subject/subjects/${subjectId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateSubject = async (subjectId, data) => {
    try{
        const response = await axiosBase.put(`/subject/subjects/${subjectId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteSubject = async (subjectId) => {
    try{
        const response = await axiosBase.delete(`/subject/subjects/${subjectId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
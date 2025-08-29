import axiosBase from "./Base/axiosBase";

export const indexTerms = async (yearId) => {
    try{
        const response = await axiosBase.get(`/academic/terms/`,{
           params: { 'year_id': yearId }
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeTerm = async (yearId, data) => {
    try{
        const response = await axiosBase.post(`/academic/terms/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showTerm = async (yearId, termId) => {
    try{
        const response = await axiosBase.get(`/academic/terms/${termId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateTerm = async (yearId, termId, data) => {
    try{
        const response = await axiosBase.put(`/academic/terms/${termId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteTerm = async (yearId, termId) => {
    try{
        const response = await axiosBase.delete(`/academic/terms/${termId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
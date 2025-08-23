import axiosBase from "./Base/axiosBase";

export const indexAdminstrators = async() => {
    try{
        const response = await axiosBase.get(`/adminstrators/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeAdminstrator = async (data) => {
    try{
        const response = await axiosBase.post(`/adminstrators/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showAdminstrator = async (adminstratorId) => {
    try{
        const response = await axiosBase.get(`/adminstrators/${adminstratorId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateAdminstrator = async (adminstratorId, data) => {
    try{
        const response = await axiosBase.put(`/adminstrator/${adminstratorId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteAdminstrator = async (adminstratorId) => {
    try{
        const response = await axiosBase.delete(`/adminstrator/${adminstratorId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
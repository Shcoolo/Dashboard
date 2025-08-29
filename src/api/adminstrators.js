import axiosBase from "./Base/axiosBase";

export const indexAdminstrators = async() => {
    try{
        const response = await axiosBase.get(`/admins/show-admins/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeAdminstrator = async (data) => {
    try{
        const response = await axiosBase.post(`/accounts/register-admin/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showAdminstrator = async (adminstratorId) => {
    try{
        const response = await axiosBase.get(`/admins/show-admins/${adminstratorId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateAdminstrator = async (adminstratorId, data) => {
    try{
        const response = await axiosBase.put(`/admins/${adminstratorId}/update-admin/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteAdminstrator = async (adminstratorId) => {
    try{
        const response = await axiosBase.delete(`/admins/${adminstratorId}/delete-admin/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
import axiosBase from "./Base/axiosBase";

export const indexSections = async(streamFilter) => {
    try{
        const params = {}
        if(streamFilter){
            params.stream_type = streamFilter
        }
        const response = await axiosBase.get(`/class/sections/`, {
            params
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const indexSectionsByClass = async(classId) => {
    try{
        const response = await axiosBase.get(`/class/classes/${classId}/show-sections/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeSection = async (data) => {
    try{
        const array = [data];
        const response = await axiosBase.post(`/class/classes/${data.class_id}/sections/`, array);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showSection = async (sectionId) => {
    try{
        const response = await axiosBase.get(`/class/sections/${sectionId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateSection = async (sectionId, data) => {
    try{
        const response = await axiosBase.put(`/class/sections/${sectionId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteSection = async (sectionId) => {
    try{
        const response = await axiosBase.delete(`/class/sections/${sectionId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
import axiosBase from "./Base/axiosBase";

export const indexTimeSlots = async() => {
    try{
        const response = await axiosBase.get(`academic/time-slots/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeTimeSlot = async (data) => {
    try{
        const response = await axiosBase.post(`/academic/time-slots/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showTimeSlot = async (timeSlotId) => {
    try{
        const response = await axiosBase.get(`/academic/time-slots/${timeSlotId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateTimeSlot = async (timeSlotId, data) => {
    try{
        const response = await axiosBase.put(`/academic/time-slots/${timeSlotId}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteTimeSlot = async (timeSlotId) => {
    try{
        const response = await axiosBase.delete(`/academic/time-slots/${timeSlotId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
import axiosBase from "./Base/axiosBase";



export const getSchoolInfo = async () => {
    try{
        const response = await axiosBase.get('/school/profile/');
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const updateSchoolInfo = async (data) => {
    try{
        const response = await axiosBase.put(`/api/school/profile/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 
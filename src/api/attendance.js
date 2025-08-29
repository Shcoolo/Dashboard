import axiosBase from "./Base/axiosBase";



export const indexAttendance = async ({ student, date}) => {
    try{
    
        const params = {};
        if(student) params.student_id = student;
        if(date)    params.date = date;
        const response = await axiosBase.get('/attendance/', {
            params
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const indexAttendanceSummary = async ({student}) => {
    try{
        const params = {};
        if(student) params.student_id = student;
        const response = await axiosBase.get('/attendance/summary/', {
            params
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const storeManyAttendance = async ({ section, date, payload }) => {
    try{
        const response = await axiosBase.post(`/attendance/record/${section}/${date}/`,
            { students_attendance: payload }
        );
        return response;
    }
    catch(error){
        throw error;
    }
} 

















export const show = async (id, data) => {
    try{
        const response = await axiosBase.get(`//${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const update = async (id, data) => {
    try{
        const response = await axiosBase.put(`//${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const deleteFn = async (id) => {
    try{
        const response = await axiosBase.delete(`//${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 

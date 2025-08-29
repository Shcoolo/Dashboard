import axiosBase from "./Base/axiosBase";



export const getTotalAvarage = async (student) => {
    try{
    
        const params = {};
        if(student) params.student_id = student;
        console.log(params);
        const response = await axiosBase.get('/grades/averages/overall/', {
            params
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

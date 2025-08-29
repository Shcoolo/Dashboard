import axiosBase from "./Base/axiosBase";



export const getReports = async ({ filter }) => {
    try{
        const params = {};
        if(filter.student) params.student_id = filter.student;
        if(filter.section) params.section_id = filter.section;
        if(filter.subject) params.subject_id = filter.subject;
        
        const response = await axiosBase.get('/grades-reports/download_excel_report/', {
            params,
            responseType: 'blob',
        });
        return response;
    }
    catch(error){
        throw error;
    }
} 

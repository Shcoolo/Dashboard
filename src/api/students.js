import axiosBase from "./Base/axiosBase";

export const indexStudents = async({section = ''}) => {
    try{
        const params = {};
        if (section) {
            params.section_id = section;
        }
        const response = await axiosBase.get(`/students/students-list/`, {
            params
        });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const storeStudent = async (data) => {
    try{
        const response = await axiosBase.post(`/students/add-student/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const showStudent = async (studentId) => {
    try{
        const response = await axiosBase.get(`/students/${studentId}/`);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const updateStudent = async (studentId, data) => {
    try{
        const response = await axiosBase.patch(`/students/${studentId}/update-student/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteStudent = async (studentId) => {
    try{
        const response = await axiosBase.delete(`/students/${studentId}/delete-student/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
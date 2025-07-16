import { axiosInstance } from './axios'

const registerUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/register', value);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const loginUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/login', value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async (value) => {   
    try {
        const response = await axiosInstance.get('/api/get-current-user', value);
        return response;
    } catch (error) {
        throw error;
    }
};

const forgetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/forgetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const resetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/resetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export {registerUser,loginUser,getCurrentUser,forgetPassword,resetPassword};
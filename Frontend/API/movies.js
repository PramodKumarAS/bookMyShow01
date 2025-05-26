import { axiosInstance } from './axios'

const addMovie = async (value) => {
    try {
        const response = await axiosInstance.post('/api/add-movie', value);
        return response.data;
    } catch (error) {
        console.error("Error during adding movie:", error?.response?.data || error.message);
        throw error;
    }
};

const updateMovie = async (value) => {
    try {
        const response = await axiosInstance.post('/api/update-movie', value);
        return response.data;   
    } catch (error) {
        console.error("Error during updating movie:", error?.response?.data || error.message);
        throw error;
    }
};

const deleteMovie = async (value) => {
    try {
        const response = await axiosInstance.post('/api/delete-movie', value);
        return response.data;   
    } catch (error) {
        throw error;
    }
};

const getAllMovies = async (value) => {   
    try {
        const response = await axiosInstance.get('/api/get-all-movies', value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}

export {
    addMovie,
    updateMovie,
    getAllMovies,
    getMovieById,
    deleteMovie
};
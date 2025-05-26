import {axiosInstance} from './axios'

const addTheatre = async (value) => {
    try {
        const response = await axiosInstance.post("/api/add-theatre", value)
        return response.data
    } catch (error) {
        throw error
    }

}

const updateTheatre = async (value) => {
    try {
        const response = await axiosInstance.put("/api/update-theatre", value)
        return response.data
    } catch (error) {
        throw error
    }

}


const deleteTheatre = async (value) => {
    try {
        const response = await axiosInstance.post("/api/delete-theatre", value);
        return response.data;
    } catch (error) {
        throw error
    }

}

const getAllTheatres = async () => {
    try {
        const response = await axiosInstance.get('/api/get-all-theatres')
        return response.data
    } catch (error) {
        throw error
    }
}


const getAllTheatresByOwner = async (values) => {
    try {
        const response = await axiosInstance.get(`/api/get-all-theatres-by-owner/${values.owner}`)
        return response.data
    } catch (error) {
        throw error
    }
}


export {
    addTheatre,
    updateTheatre,
    deleteTheatre,
    getAllTheatres,
    getAllTheatresByOwner
}
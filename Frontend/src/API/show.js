import { axiosInstance } from "./axios";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/add-show", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put("/api/update-show", payload);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/delete-show",payload);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
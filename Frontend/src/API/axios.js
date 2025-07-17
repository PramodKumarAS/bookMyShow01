import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: "https://bookmyshow01-q1j5.onrender.com"
});
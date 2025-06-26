import axios from "axios";

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`, data)
    return res.data
}

export const registerUser = async (data) => {
    console.log(data)
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/createUser`, data)
    return res.data
}

export const getAllUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/getAllUser`)
    return res.data
}

export const getDetailUser = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getDetailUser/${userId}`)
    return res.data
}
import axios from "axios";

export const getAllGenre = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/gameGenre/getAllGenre`)
    return res.data
} 
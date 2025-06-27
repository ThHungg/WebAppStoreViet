import axios from "axios";

export const gettAllGame = async (page = 0, limit = 0) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/game/getAllGame`, {
        params: { page, limit }
    })
    return res.data
}

export const getGameFavorite = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/game/getGameFavorite`)
    return res.data
}
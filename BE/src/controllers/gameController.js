const gameService = require('../services/gameService')

const createGame = async (req, res) => {
    try {
        const { name, developer, description, category, price, priceInApp, backgroundImage, releaseDate, screenshots, iconUrl, sizeMB, languages, ageRating, inAppPurchases, tags
        } = req.body;

        if (!name || !developer || !description || !category || !backgroundImage || price === undefined || priceInApp === undefined || !releaseDate || !Array.isArray(screenshots) || screenshots.length === 0 || !iconUrl || sizeMB === undefined || !Array.isArray(languages) || languages.length === 0
        ) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }
        const response = await gameService.createGame(req.body)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getAllGame = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const page = parseInt(req.query.page) || 0;
        const response = await gameService.getAllGame(page, limit)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getGameFavorite = async (req, res) => {
    try {
        const response = await gameService.getGameFavorite()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}
module.exports = {
    createGame,
    getAllGame,
    getGameFavorite
}
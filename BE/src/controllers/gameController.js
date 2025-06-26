const gameService = require('../services/gameService')

const createGame = async (req, res) => {
    try {
        const { name, developer, description, category, price, releaseDate, screenshots, iconUrl, sizeMB, languages } = req.body
        if (!name || !developer || !description || !category || price === undefined || !releaseDate || !Array.isArray(screenshots) || screenshots.length === 0 || !iconUrl || sizeMB === undefined || !Array.isArray(languages) || languages.length === 0) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const response = await gameService.createGame(req.body)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

module.exports = {
    createGame
}
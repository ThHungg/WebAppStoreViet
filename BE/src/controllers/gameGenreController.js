const { response } = require('express')
const gameGenreService = require('../services/gameGenreService')

const createGameGenre = async (req, res) => {
    try {
        const { name, icon } = req.body
        if (!name || !icon) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }
        const response = await gameGenreService.createGameGenre(req.body)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getAllGenre = async (req, res) => {
    try {
        const response = await gameGenreService.getAllGenre()
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

module.exports = {
    createGameGenre,
    getAllGenre
}
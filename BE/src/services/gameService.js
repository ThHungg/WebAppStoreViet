const Game = require('../models/Game')
const createGame = (newGame) => {
    return new Promise(async (resolve, reject) => {
        const { name, developer, description, category, price, backgroundImage, releaseDate, screenshots, iconUrl, sizeMB, languages } = newGame
        if (!name || !developer || !category) {
            return resolve({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin bắt buộc: name, developer, category"
            });
        }
        try {
            const checkGame = await Game.findOne({ name })
            if (checkGame) {
                return resolve({
                    status: "Err",
                    message: "Đã tồn tại game này"
                })
            }

            const createGame = await Game.create(newGame)
            resolve({
                status: "Ok",
                message: "Tạo game thành công",
                data: createGame
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllGame = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(page, limit)
            const skip = (page - 1) * limit
            const [games, total] = await Promise.all([Game.find().skip(skip).limit(limit),
            Game.countDocuments()
            ])

            resolve({
                status: "Ok",
                message: "Lấy danh sách game thành công!",
                data: games,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getGameFavorite = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const gameFv = await Game.find().sort({ favoritesCount: -1 }).limit(10);
            resolve({
                status: "Ok",
                message: "Lấy danh sách game yêu thích thành công!",
                data: gameFv
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createGame,
    getAllGame,
    getGameFavorite
}
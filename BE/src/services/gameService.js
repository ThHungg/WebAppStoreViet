const Game = require('../models/Game')
const createGame = (newGame) => {
    return new Promise(async (resolve, reject) => {
        const { name, developer, description, category, price, releaseDate, screenshots, iconUrl, sizeMB, languages } = newGame
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

module.exports = {
    createGame
}
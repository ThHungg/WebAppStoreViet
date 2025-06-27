const GameGenre = require('../models/GameGenre')

const createGameGenre = (newGenre) => {
    return new Promise(async (resolve, reject) => {
        const { name, icon } = newGenre
        if (!name || !icon) {
            return resolve({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        try {
            const checkGenre = await GameGenre.findOne({ name })
            if (checkGenre) {
                return resolve({
                    status: "Err",
                    message: "Đã tồn tại thể loại này"
                })
            }
            const createGenre = GameGenre.create(newGenre)
            resolve({
                status: "Ok",
                message: "Thêm thể loại mới thành công",
                data: createGenre
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllGenre = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const genre = await GameGenre.find({ active: true })
            resolve({
                status: "Ok",
                message: "Lấy thông tin thành công",
                data: genre
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createGameGenre,
    getAllGenre
}
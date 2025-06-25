const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService');
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { userName, passWord, email } = newUser;
        try {
            const checkUser = await User.findOne({ email });
            if (checkUser) {
                return resolve({
                    status: "Err",
                    message: "Email đã tồn tại"
                })
            }
            const hash = bcrypt.hashSync(passWord, 10)

            const createUser = await User.create({
                userName,
                passWord: hash,
                email
            })

            if (createUser) {
                resolve({
                    status: "Ok",
                    message: "Tạo tài khoản thành công",
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { userName, passWord, email } = userLogin;
        try {
            const checkUser = await User.findOne({ $or: [{ email }, { userName }] })
            console.log(checkUser)
            const comparePass = bcrypt.compareSync(passWord, checkUser.passWord)
            if (!comparePass) {
                return resolve({
                    status: "Err",
                    message: "Mật khẩu không đúng!"
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                role: checkUser.role
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                role: checkUser.role
            })
            console.log("refresh_token: ", refresh_token)
            resolve({
                status: "Ok",
                message: "Đăng nhập thành công",
                access_token,
                refresh_token,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: "Ok",
                message: "Lấy thành công",
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    getAllUser
}
const { json } = require('body-parser');
const userService = require('../services/userService')
const jwtService = require('../services/jwtService')
const createUser = async (req, res) => {
    try {
        const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
        const { userName, passWord, confirmPass, email } = req.body;

        const isCheckEmail = regEmail.test(email);
        const checkPass = regPass.test(passWord)

        if (!userName || !passWord || !email) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: "Err",
                message: "Email không đúng định dạng"
            })
        } else if (!checkPass) {
            return res.status(400).json({
                status: "Err",
                message: "Mật khẩu phải có ít nhất 6 ký tự, gồm ít nhất 1 chữ thường, 1 chữ in hoa, 1 số và 1 ký tự đặc biệt."
            })
        }
        if (passWord !== confirmPass) {
            return res.status(400).json({
                status: "Err",
                message: "Mật khẩu xác nhận không trùng khớp"
            })
        }
        const response = await userService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const { userName, passWord, email } = req.body;
        const isCheckEmail = reg.test(email)
        if (!email || !passWord) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: "Err",
                message: "Email không hợp lệ!"
            })
        }
        const response = await userService.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const response = await userService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: "Err",
                message: "Không tìm thấy token"
            })
        }
        const response = await jwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!'
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    refreshToken,
    getDetailUser
}
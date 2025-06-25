const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(400).json({
                    status: 'Err',
                    message: "Token không hợp lệ hoặc hết hạn"
                })
            }
            req.user = user;
            next()
        })
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(400).json({
                status: "Err",
                message: "Bạn không có quyền truy cập!"
            })
        }
        next()
    }
}

module.exports = {
    authMiddleware,
    roleMiddleware
}
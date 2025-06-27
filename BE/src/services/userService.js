const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService');
// const { sentOtp } = require('../controllers/userController');
const nodemailer = require('nodemailer')
const otpStore = new Map()

const OTP_EXPIRE_TIME = 5 * 60 * 1000;

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
            const checkUser = await User.findOne({ email })
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

const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                return resolve({
                    status: "Err",
                    message: "Không tìm thấy thông tin người dùng"
                })
            }
            resolve({
                status: "Ok",
                message: "Lấy thông tin tài khoản thành công",
                user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const sendOtp = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return resolve({
                    status: "Err",
                    message: "Email không tồn tại"
                })
            }

            const now = Date.now()

            const otp = Math.floor(100000 + Math.random() * 900000)
            otpStore.set(email, otp)
            otpStore.set(`${email}_timestamp`, now)

            setTimeout(() => {
                otpStore.delete(email)
                otpStore.delete(`${email}_timestamp`)
            }, OTP_EXPIRE_TIME)

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })
            await transporter.sendMail({
                from: "dth052k4@gmail.com",
                to: email,
                subject: "OTP xác thực",
                text: `Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút`
            })

            resolve({
                status: "Ok",
                message: "OTP đã được gửi qua mail của bạn"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const verifyOtp = ({ otp, email }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const saveOtp = otpStore.get(email)
            const otpTimeStamp = otpStore.get(`${email}_timestamp`)
            const now = Date.now()

            if (!saveOtp || !otpTimeStamp) {
                return resolve({
                    status: "Err",
                    message: "Mã OTP không tồn tại hoặc đã hết hạn"
                })
            }
            if (now - otpTimeStamp > OTP_EXPIRE_TIME) {
                return resolve({
                    status: "Err",
                    message: "OTP đã hết hạn, vui lòng yêu cầu lại!"
                })
            }

            if (parseInt(otp) !== saveOtp) {
                return resolve({
                    status: "Err",
                    message: "Mã OTP không chính xác"
                })
            }

            otpStore.delete(email)
            otpStore.delete(`${email}_timestamp`)

            resolve({
                status: "Ok",
                message: "Xác thực thành công"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const checkAccount = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, passWord } = userLogin;
            const checkEmail = await User.findOne({ email })

            if (!checkEmail) {
                return resolve({
                    status: "Err",
                    message: "Tài khoản không tồn tại"
                })
            }
            const checkPass = bcrypt.compareSync(passWord, checkEmail.passWord)
            if (!checkPass) {
                return resolve({
                    status: "Err",
                    message: "Sai mật khẩu"
                })
            }
            resolve({
                status: "Ok",
                message: "Đăng nhập thành công"
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getDetailUser,
    sendOtp,
    verifyOtp,
    checkAccount
}
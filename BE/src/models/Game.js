const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },             // Tên game
    developer: { type: String, required: true },        // Nhà phát triển
    description: { type: String },                       // Mô tả game
    category: { type: String, required: true },         // Thể loại (Action, Puzzle, etc.)
    rating: {
        average: { type: Number, min: 0, max: 5, default: 0 }, // Điểm đánh giá trung bình (0-5)
        count: { type: Number, default: 0 }                   // Số lượt đánh giá
    },
    price: { type: Number, default: 0 },                // Giá (0 nếu miễn phí)
    releaseDate: { type: Date },                         // Ngày phát hành
    screenshots: [String],                               // Danh sách URL ảnh chụp màn hình
    iconUrl: { type: String },                           // URL icon game
    sizeMB: { type: Number },                            // Dung lượng game (MB)
    languages: [String],                                 // Ngôn ngữ hỗ trợ
    ageRating: { type: String },                         // Đánh giá độ tuổi (4+, 12+, ...)
    inAppPurchases: { type: Boolean, default: false },  // Có mua hàng trong app hay không
    updatedAt: { type: Date, default: Date.now }        // Ngày cập nhật cuối cùng
});

const Game = mongoose.model("Game", gameSchema)
module.exports = Game



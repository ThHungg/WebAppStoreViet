const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },             // Tên game
    developer: { type: String, required: true },        // Nhà phát triển
    description: { type: String },                       // Mô tả game
    category: { type: String, required: true },         // Thể loại
    rating: {
        average: { type: Number, min: 0, max: 5, default: 0 }, // Điểm đánh giá trung bình
        count: { type: Number, default: 0 }                   // Số lượt đánh giá
    },
    price: { type: Number, default: 0 },                 // Giá game (0 nếu miễn phí)
    priceInApp: { type: Number, default: 0 },            // Giá mua trong app
    releaseDate: { type: Date },                          // Ngày phát hành
    screenshots: [String],                                // URL ảnh chụp màn hình
    iconUrl: { type: String },                            // URL icon game
    backgroundImage: { type: String, default: null },
    sizeMB: { type: Number },                             // Dung lượng game (MB)
    languages: [String],                                  // Ngôn ngữ hỗ trợ
    ageRating: { type: String },                          // Đánh giá độ tuổi (4+, 12+, ...)
    inAppPurchases: { type: Boolean, default: false },   // Có mua hàng trong app hay không
    downloadsCount: { type: Number, default: 0 },        // Số lượt tải tích lũy
    downloadsLast7Days: { type: Number, default: 0 },    // Lượt tải trong 7 ngày gần đây
    favoritesCount: { type: Number, default: 0 },        // Số lượt yêu thích
    addToCartCount: { type: Number, default: 0 },        // Số lượt thêm vào giỏ hàng
    tags: [String],                                       // Tag bổ sung
    createdAt: { type: Date, default: Date.now },        // Ngày tạo
    updatedAt: { type: Date, default: Date.now }         // Ngày cập nhật
});

const Game = mongoose.model("Game", gameSchema)
module.exports = Game



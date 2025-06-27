const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 0, max: 5, required },
    comment: { type: String, required },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review
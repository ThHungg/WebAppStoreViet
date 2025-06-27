const mongoose = require('mongoose')

const gameGenreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    active: { type: Boolean, default: true }
})

const GameGenre = mongoose.model("GameGenre", gameGenreSchema)
module.exports = GameGenre
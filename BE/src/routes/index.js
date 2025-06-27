const userRouter = require('./userRouter')
const gameRouter = require('./gameRouter')
const gameGernRouter = require('./gameGenreRouter')

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/game', gameRouter);
    app.use('/api/gameGenre', gameGernRouter)
}

module.exports = routes
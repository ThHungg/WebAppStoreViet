const userRouter = require('./userRouter')
const gameRouter = require('./gameRouter')

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/game', gameRouter);
}

module.exports = routes
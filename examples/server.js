'use strict'

const http  = require('http');
const app   = require('./app');

const port = process.env.PORT || 9000
const server = http.createServer(app)

server.listen(port)
server.on('listening', () => {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`

    console.log(`listening on ${bind}`)
})

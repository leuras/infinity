'use strict'

const express = require('express');
const morgan  = require('morgan');
const bodyparser = require('body-parser');

const app = express()

app.use(express.static('public'))
app.use('/js', express.static('../dist'))

app.use(morgan('dev'))
app.use(bodyparser.json())

app.use('/api', (req, res, next) => {
    res.status(200).json({
        banner: 'Bienvenue !',
        version: '2.0.0'
    })
})

module.exports = app

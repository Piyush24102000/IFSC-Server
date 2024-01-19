const express = require('express')
const quickRouter = express.Router()
const { searchBank } = require('../controller/quickSearchController')

quickRouter.post('/search', searchBank)

module.exports = { quickRouter }



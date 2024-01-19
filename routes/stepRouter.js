const express = require('express')
const stepRouter = express.Router()
const { getCityByBank, getBranch ,getBankData } = require('../controller/stepSearchController')

/* Routes */
stepRouter.post('/getCity', getCityByBank)
stepRouter.post('/getBranch', getBranch)
stepRouter.post('/getBankData', getBankData)

module.exports = { stepRouter }



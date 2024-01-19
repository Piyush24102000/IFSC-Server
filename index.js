require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const {stepRouter} = require('./routes/stepRouter')
const {quickRouter} = require('./routes/quickRouter')

/*----- Global Middlewares---- */
app.use(express.json());
app.use(cors())

/* -----------Routes----------- */
app.use('/api/stepSearch', stepRouter)
app.use('/api/quickSearch', quickRouter)

/* -------Server Connection-------*/
app.listen(process.env.PORT, () => {
    console.log("Server connected on port 5000");
})





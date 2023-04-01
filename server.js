require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const router = require('./routes');
const app = express()
const connectDB = require('./config/db');

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
connectDB()

const PORT = process.env.PORT || 5000;

app.use(router);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello there' })
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
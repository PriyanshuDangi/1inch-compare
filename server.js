const express = require('express')
const app = express()
// const port = 4000;
// const Schema = require("./src/models/model")
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/oneinchbot', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// });

// var db = mongoose.connection;

// // db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function () {
// 	console.log('connected to database');
// });

app.get('*', (req, res) => {
  res.send('Hello World!')
})


app.post("*", async (req, res) => {
    res.send({
        "title" : "welcome"
    })
})

port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
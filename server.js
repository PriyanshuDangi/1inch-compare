const express = require('express')
const app = express()
const port = 4000;
const Schema = require("./src/models/model")
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/oneinchbot', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('connected to database');
});

app.get('/', (req, res) => {
  schema.save();
  res.send('Hello World!')
})


app.get("/api/allTrans", async (req, res) => {
    try {
        const allSchema = await Schema.find().sort({"createdAt": -1}).limit(20).exec();
        res.send(allSchema);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})

const save = (forSave) => {
    console.log(forSave)
    const schema = new Schema({
        hash: '0x2179a813422ba0935aef590b6cba098fbf8dcc67c8046349589b5b3644ba6116'
    })
    schema.save();
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
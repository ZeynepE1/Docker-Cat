require('dotenv').config();
require('express-async-errors');

var cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const mongoose = require('mongoose');

app.use(cors());

var userSchema = new mongoose.Schema({
    tarih: Date,
    ip: String
});

var userModel = mongoose.model('ipAdress', userSchema);

app.get('/', (req, res) => {
    res.send('Zeynep');
});
// app.get('/getip', (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     res.send(ip);
// });

app.get('/get-data', function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var userDetails = new userModel({
        tarih: new Date(),
        ip,
    });

    userDetails.save((err, doc) => {
        console.log(doc)
    });

    userModel.find((err, docs) => {
        console.log(docs)
        res.json(docs);

        // res.send("<html><body><table style='border: 1px solid black;'><tr style='border: 1px solid black;'><th style='border: 1px solid black;'>IP</th><th style='border: 1px solid black;'>Tarih</th></tr>" + docs.map(element => {
        //     return (
        //         "<tr style='border: 1px solid black;'><td style='border: 1px solid black;'>" + element.ip + "</td><td style='border: 1px solid black;'>" + element.tarih.toLocaleString() + "</td></tr>"

        //     );
        // }) + "</table></body></html>");

    }).select('-__v').sort({ tarih: 'desc' });
});

const port = 5001;
const start = async () => {
    try {
        await connectDB('Database bağlantı linki');
        app.listen(port, () =>
            console.log(`Server is listening on ports ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
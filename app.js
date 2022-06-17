require ('dotenv/config');

const express = require("express");
var cors = require('cors');

const evento = require("./controller/evento")

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});

app.use('/evento', evento);


app.listen(process.env.PORT || 8083, () => {
    console.log("Servidor iniciado com sucesso");
});



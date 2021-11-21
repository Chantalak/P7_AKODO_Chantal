//import d'express création REST API
const express = require('express');

//application express
const app = express();

//middleware général appliquer à toutes les requetes envoyées serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//obsolescence bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));  

module.exports = app;
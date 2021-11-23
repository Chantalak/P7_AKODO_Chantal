//importation d'express création REST API application express
const express = require('express');
const app = express();
//accéder path serveur
const path = require('path');

//eregistrements routeur
const userRoutes = require('./routes/user');

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

//models dans la base de données
const db = require("./models");
db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes 
app.use('/api/user', userRoutes);

module.exports = app;
//importation d'express création REST API application express
const express = require('express');
const path = require('path');
//sécurité du site
const helmet = require('helmet');
const multer = require('multer');
const rateLimit = require("./middleware/rateLimit");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(rateLimit);  //empêcher les attaques brutes (rateLimit)
app.use(helmet()); //identifier les éléments protèger par helmet
app.use(helmet.noSniff()); //empêcher le navigateur de contourner l'entête Content-Type
app.use(helmet.hidePoweredBy()); //cacher le powered by Express dans chaque entête de requête
app.use(helmet.ieNoOpen()); //empêcher IE d'éxécuter des téléchargements provenant de page potentiellement malveillante
app.use(helmet.frameguard({ action: 'deny' })); //empêche le click jacking  
app.use(helmet.xssFilter({})); //prévenir les attaques xss

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

app.use("/images", express.static(path.join(__dirname, "images")));
/* const upload = multer({
    dest: './images'
});
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ res: "cool man!" })
});
 */
//enregistrement des routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
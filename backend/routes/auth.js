//middleware 
//import d'express pour utiliser la fonction Router d'express
const express = require('express');
const router = express.Router();

//controller pour associer fonction aux différentes routes
const authCtrl = require('../controllers/auth');

//middleware 
const multer = require('../middleware/multer-config');
//Middleware de vérification 
const emailVerification = require('../middleware/email-regex');
const passwordVerification = require('../middleware/password-regex');

//authentification
router.post('/signup', emailVerification, passwordVerification, multer, authCtrl.signup);
router.post('/login', authCtrl.login);

//exporte routeur
module.exports = router;
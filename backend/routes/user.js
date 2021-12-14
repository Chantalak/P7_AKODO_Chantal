//import d'express pour utiliser la fonction Router d'express
const express = require('express');
const router = express.Router();

//controller pour associer fonction aux différentes routes
const userCtrl = require('../controllers/user');

//middleware 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//Middleware de vérification 
const emailVerification = require('../middleware/email-regex');
const passwordVerification = require('../middleware/password-regex');

//authentification
router.post('/signup', emailVerification, passwordVerification, multer, userCtrl.signup);
router.post('/login', userCtrl.login);

//Renvoie un tableau de tous les utilisateurs de la BDD
router.get('/', userCtrl.getAll);
//récupérer profil 
router.get('/profil', auth, userCtrl.profil);
//supprimer profil
router.delete('/delete', auth, multer, userCtrl.deleteUser);

//exporte routeur
module.exports = router;
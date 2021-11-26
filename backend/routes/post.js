//import d'express pour utiliser la fonction Router d'express
const express = require('express');
const router = express.Router();

//controller pour associer fonction aux différentes routes
const postCtrl = require('../controllers/post');

//middleware 
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config')

//tableau de tous les posts de la BDD
router.get('/', auth, postCtrl.getAll);
//créer un post
router.post('/create', auth, multer, postCtrl.create);
//modifier post
router.put('/modify', auth, multer, postCtrl.modify);
//supprimer post
router.delete('/delete', auth, multer, postCtrl.delete);

//exporte routeur
module.exports = router;
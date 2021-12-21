//import d'express pour utiliser la fonction Router d'express
const express = require('express');
const router = express.Router();

//controller pour associer fonction aux différentes routes
const postCtrl = require('../controllers/post');

//middleware 
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config')

//tableau de tous les posts de la BDD
router.get('/', auth, postCtrl.getAllPosts);
//créer un post
router.get('/:id', auth, postCtrl.getOnePost);
//créer un post
router.post('/create', auth, multer, postCtrl.createOnePost);
//modifier post
router.put('/:id', auth, multer, postCtrl.modifyOnePost);
//supprimer post
router.delete('/:id', auth, multer, postCtrl.deleteOnePost);

//exporte routeur
module.exports = router;
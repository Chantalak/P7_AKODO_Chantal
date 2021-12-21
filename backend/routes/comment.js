//Création d'un routeur pour exporter dans app
const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require('../controllers/comment');

//Routes
router.get('/', auth, commentCtrl.getAllComments);
router.post('/create', auth, commentCtrl.createOneComment);
router.put('/:id', auth, commentCtrl.modifyOneComment);
router.delete('/:id', auth, commentCtrl.deleteOneComment);

module.exports = router;
//Création d'un routeur pour exporter dans app
const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require('../controllers/comment');

//Routes
router.post('/create', auth, commentCtrl.create);
//modifier post
router.put('/modify', auth, commentCtrl.modify);
//supprimer post
router.delete('/delete', auth, commentCtrl.delete);

module.exports = router;
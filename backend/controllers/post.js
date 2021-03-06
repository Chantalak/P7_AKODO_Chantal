const jwt = require('jsonwebtoken');
const db = require("../models");
const fs = require('fs');
const xss = require('xss');

exports.getAllPosts = (req, res) => {
    db.Post.findAll({
        order: [['createdAt', 'DESC']],
    })
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json({ error: error })
    })
};

exports.createOnePost = (req, res) => {
    // vérification que tous les champs sont remplis
    if(!req.body.title || !req.body.content ) {
        return res.status(400).json({message: "Tous les champs doivent être rensignés!"});
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const id = decodedToken.userId;

    const file = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

    const post = {
        userId: xss(id),
        title: xss(req.body.title),
        content: xss(req.body.content),
        attachment: xss(file)
    };

    // création d'un post 
    db.Post.create(post)
        .then(() => res.status(201).json({ message: "Le post a été créé"}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res) => {
    db.Post.findOne({
        where: {id: req.params.id}, 
    })
    .then((post) => {
        console.log('post');
        res.status(200).json(post);
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.modifyOnePost = (req, res) => {
    const file = req.file ? req.file.filename : null;

    db.Post.findOne({
        attributes: ['id', 'title', 'content', 'attachment'], 
        where: {id: req.params.id} 
    })
    .then((post) => {
        post.update({
            ...req.body, 
            attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(() => res.status(200).json({ message: "Votre post a bien été modifié !"}))
        .catch(error => res.status(400).json({ error }));
    
    }) 
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
 
exports.deleteOnePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const isAdmin = decodedToken.isAdmin;

    db.Post.findOne({
        where: {id: req.params.id || isAdmin == true}
    })
    .then((post) => {  
        if (db.Post.attachment == null) {
            db.Comment.destroy({ where: { postId: req.params.id }})
            db.Post.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: "Votre post a bien été supprimé" }))
            .catch((error) => res.status(400).json({ error }))  
        } else {
            const filename = post.attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.Comment.destroy({ where: { postId: req.params.id }})
                db.Post.destroy({ where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: "Votre post a bien été supprimé" }))
                .catch((error) => res.status(400).json({ error }))  
            })
        }  
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
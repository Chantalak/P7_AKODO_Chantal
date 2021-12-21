const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

exports.getAllPosts = (req, res) => {
    db.Post.findAll({
        order: [['createdAt', 'DESC']],
        include: [{models: db.Comments}]
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

    const file = req.file ? req.file.filename : null;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const id = decodedToken.userId;

    const post = {
        userId: id,
        title: req.body.title,
        content: req.body.content,
        attachment: file
    };

    // création d'un post 
    db.Post.create(post)
        .then(() => res.status(201).json({ message: "Le post a été créé"}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res) => {
    db.Post.findOne({
        where: {id: req.params.id} 
    })
    .then((user) => {
        console.log('user');
        res.status(200).json(user);
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.modifyOnePost = (req, res) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'content', 'attachment'], 
        where: {id: req.params.id} 
    })
    .then((post) => {
        post.update({
            ...req.body, 
            filename: `${req.body.attachment}`,
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
    db.Post.findOne({
        where: {id: req.params.id}
    })
    .then((post) => {
        const filename = `./images/${post.imageURL}`;
        fs.unlink(filename, () => {
            db.Post.destroy({ where: { id: req.body.id }})
            .then(() => res.status(200).json({ message: "Votre post a bien été supprimé" }))
            .catch((error) => res.status(400).json({ error }))
        })
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
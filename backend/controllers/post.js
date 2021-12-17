const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

//importation cross site scripting
const xss = require('xss')

exports.getAll = (req, res) => {
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

exports.create = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis
    if(title === null || content === null) {
        return res.status(400).json({'error': "Certains champs ne sont pas remplis"});
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let id = decodedToken.userId;

    const postObject = req.body;
    
    const file = req.file ? req.file.filename : null;
    const post = new db.Post ({
        userId: xss(id),
        id: xss(req.body.id),
        ...postObject,
        attachment: file
    });
    post.save()
        .then(() => res.status(201).json({ post }))   
        .catch((error) => res.status(400).json({ error : error }));
    
};

exports.getOnePost = (req, res) => {
    db.Post.findOne({
        where: {id: req.body.id} 
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

exports.modify = (req, res) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'content', 'attachment'], 
        where: {id: req.body.id} 
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
 
exports.delete = (req, res) => {
    db.Post.findOne({
        where: {id: req.body.id}
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
const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

// logique métier
exports.getAll = (req, res, next) => {
    db.Comment.findAll()
    .then(comments => {
        res.status(200).json( comments );
    })
    .catch(error => res.status(400).json({ error }));
};

exports.create = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let id = decodedToken.userId;

    const commentObject = req.body;

    const comment = new db.Comment({
        id: req.body.id,
        userId: id,
        ...commentObject
    })
    comment.save()
        .then(() => { res.status(201).json({ message: "Votre commentaire a été posté"}) })
        .catch((error) => { res.status(400).json({ error: error}) })
};

exports.modify= (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id', 'content'], 
        where: {id: req.body.id} 
    })
    .then((comment) => {
        comment.update({
            ...req.body, 
        })
        .then(() => res.status(200).json({ message: "Votre commentaire a été modifié !"}))
        .catch(error => res.status(400).json({ error }));

    }) 
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.delete = (req, res) => {
    db.Comment.destroy({ where: {id: req.body.id} })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};
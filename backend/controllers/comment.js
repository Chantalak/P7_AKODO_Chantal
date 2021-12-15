const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

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

exports.delete = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    const commentObject = req.body;

    db.Comment.findOne({ 
        where: {id: req.body.id} 
    })
    .then((comment) => {
        if (userId === comment.UserId || isAdmin === true) {
            comment.destroy({
                id: req.body.id,
                userId: id,
                ...commentObject, 
            })
            .then(() => res.status(200).json({ message: "Votre commentaire a été supprimé !"}))
            .catch(error => res.status(400).json({ error }));
        }
    }) 
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
const db = require("../models");
const fs = require('fs');

exports.create = (req, res, next) => {
    const commentObject = req.body;
    
    const comment = new db.Comment({
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
    db.Comment.findOne({
        attributes: ['id'], 
        where: {id: req.body.id} 
    })
    .then((comment) => {
        comment.destroy({
            ...req.body, 
        })
        .then(() => res.status(200).json({ message: "Votre commentaire a été supprimé !"}))
        .catch(error => res.status(400).json({ error }));
    
    }) 
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

// logique métier
exports.getAllComments = (req, res) => {
    db.Comment.findAll({
        order: [['createdAt', 'DESC']],
    })
    .then((comments) => {
        res.status(200).json(comments);
    })
    .catch((error) => {
        res.status(400).json({ error: error })
    })
};

exports.createOneComment = (req, res) => {
     // vérification que tous les champs sont remplis
     if( !req.body.content ) {
        return res.status(400).json({message: "Votre commentaire ne peut pas être vide!"});
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let id = decodedToken.userId;

    db.Comment.create({
        userId: id,
        postId: req.body.postId,
        content: req.body.content,
    })
    comment.save()
        .then(() => { res.status(201).json({ comment }) })
        .catch((error) => { res.status(400).json({ error: error}) })
};

exports.getOneComment = (req, res) => {
    db.Comment.findOne({
        where: {id: req.params.id}, 
    })
    .then((comment) => {
        console.log('comment');
        res.status(200).json(comment);
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.modifyOneComment = (req, res, next) => {
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

exports.deleteOneComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const isAdmin = decodedToken.isAdmin;

    db.Comment.findOne({
        where: {id: req.params.id || isAdmin}
    })
    .then((commnt) => {
        db.Comment.destroy({ 
            where: {id: req.params.id} 
        })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
    
};
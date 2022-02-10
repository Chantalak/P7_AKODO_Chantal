const db = require("../models");
const fs = require('fs');

exports.getAllUsers = (req, res ) => {
    db.User.findAll()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.getOneUser = (req, res ) => {  
    db.User.findOne({
        where: {id: req.params.id} 
    })
    .then((user) => {
        console.log(user)
        res.status(200).json(user);
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};

exports.modifyOneUser = (req, res) => {
    
    const file = req.file ? req.file.filename : null;

    db.User.findOne({
        attributes: ['id', 'imageURL', 'name'], 
        where: {id: req.params.id} 
    })
    .then((user) => {
        user.update({
            name: req.body.name,
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(() => res.status(200).json({user, file}))
        .catch(error => res.status(400).json({ error }));
    }) 
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
    
};

exports.deleteOneUser = (req, res) => {
    const file = req.file ? req.file.filename : null;

    db.User.findOne({
        where: {id: req.params.id }
    })
    .then((user) => {
        if (db.User.imageURL == null) {
            db.User.destroy({ where: {id: req.params.id}})
                .then(() => res.status(200).json({ message: "Compte utilisateur supprimé" }))
                .catch((error) => res.status(400).json({ error }))
        } else {
            const filename = user.imageURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                db.Comment.destroy({ where: {userId: req.params.id}})
                db.Post.destroy({ where: {userId: req.params.id}})
                db.User.destroy({ where: {id: req.params.id}})
                .then(() => res.status(200).json({ message: "Compte utilisateur supprimé" }))
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
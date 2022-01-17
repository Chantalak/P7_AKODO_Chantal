//const jwt = require('jsonwebtoken');

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
  
    console.log( req.file);

};

exports.deleteOneUser = (req, res) => {
    db.User.findOne({
        where: {id: req.params.id}
    })
    .then((user) => {
        const filename = `./images/${user.imageURL}`;
        fs.unlink(filename, () => {
            db.Post.destroy({ where: {userId: req.params.id}})
            db.User.destroy({ where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: "Compte utilisateur supprimé" }))
            .catch((error) => res.status(400).json({ error }))
        })
    })
    .catch((error) => { 
        res.status(400).json({
            error: error
        });
    });
};
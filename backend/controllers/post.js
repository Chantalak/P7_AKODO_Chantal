const db = require("../models");
const fs = require('fs');

exports.getAll = (req, res, next) => {
    db.Post.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: db.Comment }]
    })
    .then((post) => {
        res.status(200).json({ post });
    })
    .catch((error) => {
        res.status(400).json({ error: error })
    })
};

exports.create = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    // vérification que tous les champs sont remplis
    if(title === null || content == null) {
        return res.status(400).json({'error': "Certains champs ne sont pas remplis"});
    }

    const postObject = req.body; 

    const post = new db.Post ({
        ...postObject,
        attachment: `${req.protocol}://${req.get('host')}/images/${db.Post.attachment}`,
    });
    post.save()
        .then(() => res.status(201).json({ message : "Votre post a bien été créé" }))   
        .catch((error) => res.status(400).json({ error : error }));
};

exports.modify = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'content', 'attachment'], 
        where: {id: req.body.id} 
    })
    .then((post) => {
        post.update({
            ...req.body, 
            attachment: `${req.protocol}://${req.get('host')}/images/${db.Post.attachment}`,
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

//à faire après 
exports.delete = (req, res, next) => {
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
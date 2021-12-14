const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const fs = require('fs');

exports.signup = (req, res, next) => {
    //récupération paramètres envoyés dans la requête
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    //vérification que tous les champs obligatoires sont remplis
    if(email === null || name == null || password === null ) {
        return res.status(400).json({ error: "Certains champs ne sont pas bien remplis" });
    }

    //vérification si utilisateur existe déja dans la BDD
    db.User.findOne({
        where: { email: email }
    })
    .then((user) => {
        if(user){
            return res.status(500).json({ error: "L'Utilisateur a déjà été enregistré" })
        }
        bcrypt.hash(password, 10) 
        .then(hash => {
            const filename = `${req.body.imageURL}`;
            db.User.create ({
                email: email,
                name: name,
                password: hash,
                imageURL: filename,
                isAdmin: 0,
            })
        });
        user.save()
        //message utilisateur est créé ne s'affiche pas
            .then(() => res.status(201).json({ message: "L'Utilisateur est créé" }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch((error) => { 
        return res.status(500).json({ error })
    });
};

exports.login = (req, res, next) => {
    //récupération paramètres envoyés dans la requête
    const email = req.body.email;
    const password = req.body.password;

    //vérification que tous les champs sont remplis
    if(email === null || password === null ) {
        return res.status(400).json({ error: "Certains champs ne sont pas remplis" });
    }

    //vérification si utilisateur existe déja dans la BDD
    db.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //quand on trouve le bon user 
        //bcrypt compare MDP user avec hash enregistré avec user
        bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                //si tout est bon renvoie userID + token à user
                res.status(200).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    token: jwt.sign(
                        { 
                            userId: user.id, 
                            isAdmin: user.isAdmin
                        },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
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

exports.profil = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let id = decodedToken.userId;
    db.User.findOne({
        where: {id: id} 
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

//à faire après parce image à supprimer avec multer
exports.deleteUser = (req, res, next) => {
    db.User.findOne({
        where: {id: req.body.id}
    })
    .then((user) => {
        const filename = `./images/${user.imageURL}`;
        fs.unlink(filename, () => {
            db.Post.destroy({ where: {userId: req.body.id}})
            db.User.destroy({ where: {id: req.body.id}})
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
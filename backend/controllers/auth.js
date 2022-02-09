const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if(email === null || name === null || password === null ) {
        return res.status(400).json({ error: "Certains champs ne sont pas bien remplis" });
    }

    db.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if(user){
            return res.status(400).json({ error: "L'Utilisateur a déjà été enregistré" })
        }
        bcrypt.hash(password, 10) 
        .then(hash => {
            db.User.create ({
                email: email,
                name: name,
                password: hash, 
                isAdmin: 0,
            })
                .then(() => res.status(201).json({ message: "L'Utilisateur est créé"}))
                .catch(error => res.status(400).json({ error }));
        });
    })
    .catch((error) => { 
        return res.status(500).json({ error })
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email === null || password === null ) {
        return res.status(400).json({ error: "Certains champs ne sont pas remplis" });
    }

    db.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
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
                    ),
                    user: {...user.dataValues } 
                });
            })
            .catch(error => res.status(400).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};
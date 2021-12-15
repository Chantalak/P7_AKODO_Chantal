//package pour vérification token
const jwt = require('jsonwebtoken');

//middleware appliqué avant controller de nos routes
module.exports = (req, res, next) => {
    try {
        //récupération token dans header
        const token = req.headers.authorization.split(' ')[1];
        //décode le token puis vérifie
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //récupère userId & isadmin
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        //vérifie si userId correspond à celui du token si ok next
        if (req.body.userId && req.body.user.id !== userId) {
            throw 'Invalid user ID';
        } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
            throw 'Not Admin';
        } else {
            next();
        }
    } catch {
        //erreur pour problème d'authentification
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
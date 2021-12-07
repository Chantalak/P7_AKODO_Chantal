module.exports = (req, res, next) => {
    const emailVerification = (email) => {
        let emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
        let isRegexTrue = emailRegex.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: 'Votre E-mail est invalide!' });
    }
    emailVerification(req.body.email);
};
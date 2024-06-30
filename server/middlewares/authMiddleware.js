const jwt = require('jsonwebtoken');
const authenticateUser = async (req, res, next) => {
    const authToken = req.headers.authorization || req.query.token;
    if (!authToken) {
        return res.status(401).json({ message: 'Authentication failed!' });
    }
    jwt.verify(authToken, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized Please login again' });
        }
        req.user = decoded;
        next();
    })
}

module.exports = authenticateUser;
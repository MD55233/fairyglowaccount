import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming a Bearer token format

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

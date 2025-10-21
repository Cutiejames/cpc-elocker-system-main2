// const authorizeAdmin = (req, res, next) => {
//     if(req.user.role !== 'admin') {
//         return res.status(403).json({error: 'Access denied!'});
//     }
//     next();
// }

// module.exports = authorizeAdmin;

const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'unauthorized: user not found in request' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'access denied: admin role required' });
    }

    next();
};

module.exports = authorizeAdmin;
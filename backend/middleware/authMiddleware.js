const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "test@one");
        req.user = decoded;
        req.userEmail = decoded.userEmail;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;

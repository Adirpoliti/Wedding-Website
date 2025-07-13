"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const checkAdmin = (req, res, next) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({ message: 'Unauthorized: no user found' });
        return;
    }
    if (user.role !== 'Admin') {
        res.status(403).json({ message: 'Access denied: Admins only' });
        return;
    }
    next();
};
exports.checkAdmin = checkAdmin;

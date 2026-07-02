const express = require('express');
const jwt = require('jsonwebtoken');


const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    }
    catch (error) {
        console.error("Invalid token: unauthorized access");
        return res.status(500).json({ message: "Invaild token" });
    }

}



module.exports = AuthMiddleware ;
import express, { NextFunction, Request, Response } from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    const version = "1.0.0";
    res.send(`API version: ${version}`);
});

export default router
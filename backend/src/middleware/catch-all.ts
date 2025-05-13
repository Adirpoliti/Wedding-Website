import { Request, Response, NextFunction } from "express";
import { errorData } from "../utils/logger";

export const catchAll = (err: any, req: Request, res: Response, next: NextFunction) => {
    errorData.log("error", err.message)
    res.status(err.status).send(err.message)
}
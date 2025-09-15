import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header: ", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token: ", token);

    if (!token) {
        res.status(401).json({ error: "Token não fornecido" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: "Token inválido" });
            return;
        }
        (req as any).user = decoded;
        next();
    });
};

export { authenticateToken };

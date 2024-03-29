import { decodeToken, verifyToken } from "../controllers/utils/Token";
import {Request, Response, NextFunction} from 'express';

interface AuthenticatedRequest extends Request {
    userId?: number;
    userEmail?: string;
}

export function verifyUser(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: 'No token provided'});
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'No token provided'});
    const verify = verifyToken(token);
    if (!verify) return res.status(401).json({message: 'Invalid token'});
    const decoded = decodeToken(token);
    if (!decoded) return res.status(401).json({message: 'Invalid token'});
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
}

export function verifyAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: 'No token provided'});
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'No token provided'});
    const verify = verifyToken(token);
    if (!verify) return res.status(401).json({message: 'Invalid token'});
    const decoded = decodeToken(token);
    if (!decoded) return res.status(401).json({message: 'Invalid token'});
    if (decoded.role !== 1) return res.status(401).json({message: 'Unauthorized'});
    next();
}

export function verifyAdminOrMe(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: 'No token provided'});
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'No token provided'});
    const verify = verifyToken(token);
    if (!verify) return res.status(401).json({message: 'Invalid token'});
    const decoded = decodeToken(token);
    if (!decoded) return res.status(401).json({message: 'Invalid token'});
    if (!(decoded.role === 1 || String(decoded.id) === req.params.id)) return res.status(401).json({message: 'Unauthorized'});
    req.userId = parseInt(req.params.id, 10);
    next();
}
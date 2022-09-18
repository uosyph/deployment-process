import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const pepper = process.env.TOKEN_SECRET!;

export const verifyToken = (req: Request, res: Response, next: Function) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        // check if user provided token
        if (!token) {
            res.status(401).send('No Token!');
            return;
        }
        // check if token is valid
        jwt.verify(token, pepper, (err, ok) => {
            const verified = ok as { user: User };
            if (err) res.status(400);
            if (!verified) res.send('Bad Token!');
            else {
                res.locals.user = verified.user;
                next();
            }
        });
    } catch (error) {
        res.status(401);
    }
};

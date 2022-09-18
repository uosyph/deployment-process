import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, StoreUser } from '../models/user';
import { verifyToken } from '../middleware/auth';

const user_route = express.Router();
const storeuser = new StoreUser();
const pepper: string = process.env.TOKEN_SECRET as string;

// index method route
user_route.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await storeuser.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

// show method route
user_route.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await storeuser.show(req.body.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

// create method route
user_route.post('/', async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await storeuser.create(user);
        const token = jwt.sign({ user: newUser }, pepper);
        res.json(token);
        console.log(token);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
});

// authorization route
user_route.post('/auth', async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const usr = await storeuser.auth(user.username, user.password);
        if (!usr) {
            res.status(401);
            return;
        }
        const token = jwt.sign({ user: usr }, pepper);
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json(err);
        console.log(err);
    }
});

// delete route
user_route.delete('/', async (req: Request, res: Response) => {
    try {
        const deleted = await storeuser.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default user_route;

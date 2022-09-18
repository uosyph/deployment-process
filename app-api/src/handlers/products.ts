import express, { Request, Response } from 'express';
import { Product, StoreProduct } from '../models/product';
import { verifyToken } from '../middleware/auth';

const product_route = express.Router();
const storeproduct = new StoreProduct();

// index method route
product_route.get('/', async (_req: Request, res: Response) => {
    try {
        const products = await storeproduct.index();
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
});

// show method route
product_route.get('/:id', async (req: Request, res: Response) => {
    try {
        const Product = await storeproduct.show(req.body.id);
        res.json(Product);
    } catch (err) {
        res.status(400).json(err);
    }
});

// create method route
product_route.post('/', async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category ?? 'uncategorized',
        };
        const newProduct = await storeproduct.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete route
product_route.delete('/', async (req: Request, res: Response) => {
    try {
        const deleted = await storeproduct.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default product_route;

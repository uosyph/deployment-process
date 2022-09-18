import express, { Request, Response } from 'express';
import { DashboardQueries } from '../models/dashboard';

const dashboard = new DashboardQueries();

const topSoldProds = async (_req: Request, res: Response) => {
    const products = await dashboard.topSoldProds();
    res.json(products);
};

const specificTopSoldProds = async (req: Request, res: Response) => {
    const products = await dashboard.specificTopSoldProds(req.body.prods);
    res.json(products);
};

const filterByCategory = async (req: Request, res: Response) => {
    const products = await dashboard.filterByCategory(req.body.category);
    res.json(products);
};

const dashboard_routes = (app: express.Application) => {
    app.get('/top-products', topSoldProds);
    app.get('/top-products/:n', specificTopSoldProds);
    app.get('/filter-by-category', filterByCategory);
};

export default dashboard_routes;

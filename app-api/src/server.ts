import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import product_route from './handlers/products';
import user_route from './handlers/users';
import order_route from './handlers/orders';
import dashboard_routes from './services/handlers/dashboard';

const app: express.Application = express();
const PORT = '3000';

const corsConfig = {
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Main Route');
});

app.use('/users', user_route);
app.use('/products', product_route);
app.use('/orders', order_route);
dashboard_routes(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

export default app;

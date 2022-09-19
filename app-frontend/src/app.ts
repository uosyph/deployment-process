import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const api = process.env.API_URL || 'http://random-yousef-bucket.s3-website-us-east-1.amazonaws.com/'

const app: express.Application = express();
const PORT = '8080';

const corsConfig = {
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

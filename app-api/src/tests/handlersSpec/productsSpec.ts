import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;
const product = {
    name: 'testprod',
    price: '420',
    category: 'general',
};

describe('Product Endpoints', () => {
    it('POST new product with token', async () => {
        const response = await request
            .post('/products')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        expect(response.body.length >= 0);
    });

    it('POST will return 401 if no token', async () => {
        const response = await request.post('/products').send(product);
        expect(response.status).toBe(401);
    });

    it('INDEX a list of products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('SHOW product using id', async () => {
        const response = await request.get('/products/:id').send({ id: '1' });
        expect(response.status).toBe(200);
    });

    it('DELETE product with token', async () => {
        const response = await request
            .delete('/products')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response.body.length >= 0);
    });

    it('DELETE will return 401 if no token', async () => {
        const response = await request.delete('/products').send({ id: '1' });
        expect(response.status).toBe(401);
    });
});

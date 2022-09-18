import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;
const order = {
    user_id: '1',
    product_id: '1',
    quantity: '1',
};

describe('Order Endpoints', () => {
    it('POST new order with token', async () => {
        const response = await request
            .post('/orders')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        expect(response).toBeDefined();
    });

    it('POST will return 401 if no token', async () => {
        const response = await request.post('/orders').send(order);
        expect(response.status).toBe(401);
    });

    it('SHOW order using id with token', async () => {
        const response = await request
            .get('/orders/:id')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response).toBeDefined();
    });

    it('SHOW will return 401 if no token', async () => {
        const response = await request.get('/orders/:id').send({ id: '1' });
        expect(response.status).toBe(401);
    });

    it('UPDATE status of order with token', async () => {
        const response = await request
            .post('/orders/done')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response).toBeDefined();
    });

    it('UPDATE will return 401 if no token', async () => {
        const response = await request.post('/orders/done').send({ id: '1' });
        expect(response.status).toBe(401);
    });

    it('DELETE order with token', async () => {
        const response = await request
            .delete('/orders')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response).toBeDefined();
    });

    it('DELETE will return 401 if no token', async () => {
        const response = await request.delete('/orders').send({ id: '1' });
        expect(response.status).toBe(401);
    });
});

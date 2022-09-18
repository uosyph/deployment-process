import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Dashboard Endpoints', () => {
    it('can GET to /top-products', async () => {
        const response = await request.get('/top-products');
        expect(response.status).toBe(200);
    });

    it('can GET to /top-products/:n', async () => {
        const response = await request.get('/top-products/:n');
        expect(response.status).toBe(200);
    });

    it('can filter products by category', async () => {
        const response = await request.get('/filter-by-category');
        expect(response.status).toBe(200);
    });
});

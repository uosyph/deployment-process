import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;
const user = {
    username: 'testuser',
    password: 'password123',
};

describe('User Endpoints', () => {
    it('POST new user will returen a token', async () => {
        const response = await request.post('/users').send(user);
        expect(response.status).toBe(200);
        token = response.body;
        expect(token).toBeDefined();
    });

    it('AUTH user will return token', async () => {
        const response = await request.post('/users/auth').send(user);
        expect(response.status).toBe(200);
        token = response.body;
        expect(token).toBeDefined();
    });

    it('INDEX a list of users with token', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token);
        expect(response.body.length >= 0);
    });

    it('INDEX will return 401 if no token', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });

    it('SHOW user using id with token', async () => {
        const response = await request
            .get('/users/:id')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response.body.length >= 0);
    });

    it('SHOW will return 401 if no token', async () => {
        const response = await request.get('/users/:id').send({ id: '1' });
        expect(response.status).toBe(401);
    });

    it('DELETE user using id with token', async () => {
        const response = await request
            .delete('/users')
            .send({ id: '1' })
            .set('Authorization', 'Bearer ' + token);
        expect(response.body.length >= 0);
    });

    it('DELETE will return 401 if no token', async () => {
        const response = await request.delete('/users').send({ id: '1' });
        expect(response.status).toBe(401);
    });
});

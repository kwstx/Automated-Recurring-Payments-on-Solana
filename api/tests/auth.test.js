import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/authRoutes.js';
import db from '../src/database.js';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Endpoints', () => {
    const testUser = {
        username: `testuser_${Date.now()}`,
        password: 'TestPassword123!',
        walletAddress: 'TestWalletAddress123'
    };

    afterAll(() => {
        // Clean up test user
        db.prepare('DELETE FROM merchants WHERE username = ?').run(testUser.username);
    });

    describe('POST /auth/register', () => {
        it('should register a new merchant', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Merchant registered successfully');
            expect(response.body).toHaveProperty('merchantId');
        });

        it('should reject duplicate username', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send(testUser);

            expect(response.status).toBe(409);
            expect(response.body).toHaveProperty('error', 'Username already exists');
        });

        it('should reject incomplete data', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({ username: 'test' });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /auth/login', () => {
        it('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('merchant');
            expect(response.body.merchant).toHaveProperty('username', testUser.username);
        });

        it('should reject invalid credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: testUser.username,
                    password: 'WrongPassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Invalid credentials');
        });
    });
});

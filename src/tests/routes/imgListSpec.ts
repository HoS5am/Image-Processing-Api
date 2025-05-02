import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('suite for testing images list page endpoint response /api/', () => {
  it('expects 200 status if image file list is displayed', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

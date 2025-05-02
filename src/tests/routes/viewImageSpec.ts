import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('suite for testing ViewImage Page endpoint response /api/image', () => {
  it('expects 200 status if image from filename=starrynight.jpg is displayed', async (): Promise<void> => {
    const response = await request.get('/image?filename=starrynight.jpg');
    expect(response.status).toBe(200);
  });

  it('expects 400 status if image from filename=test.jpg is not part of original directory and cannot be displayed', async (): Promise<void> => {
    const response = await request.get('/image?filename=test.jpg');
    expect(response.status).toBe(400);
  });
});

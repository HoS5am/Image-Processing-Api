import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('suite for testing Image Resize Parameters /api/images', () => {
  it('expects 400 status if image parameters are not completely present e.g. no filename or height/width not a number', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=starrynight.jpg&height=asd&width=300',
    );
    expect(response.status).toBe(400);
  });
  it('expects 400 status if image parameters height or width are negative', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=starrynight.jpg&height=-300&width=600',
    );
    expect(response.status).toBe(400);
  });
});

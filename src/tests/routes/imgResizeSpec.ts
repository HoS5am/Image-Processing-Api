import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

// Test Suite: Testing Image Resize functionality at /api/images
describe('suite for testing Image Resize Parameters /api/images', () => {
  // Test Case: Ensures that the server responds with 400 status
  // when invalid parameters are provided, e.g., a non-numeric height/width
  it('expects 400 status if image parameters are not completely present e.g. no filename or height/width not a number', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=starrynight.jpg&height=asd&width=300',
    );
    expect(response.status).toBe(400);
  });

  // Test Case: Ensures that the server responds with 400 status
  // when negative height or width values are passed
  it('expects 400 status if image parameters height or width are negative', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=starrynight.jpg&height=-300&width=600',
    );
    expect(response.status).toBe(400);
  });
});

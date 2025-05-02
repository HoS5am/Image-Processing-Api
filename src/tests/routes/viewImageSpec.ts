import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

// Test Suite: Testing image view functionality at /api/image
describe('suite for testing ViewImage Page endpoint response /api/image', () => {
  // Test Case: Check that the image can be viewed successfully if it exists
  it('expects 200 status if image from filename=starrynight.jpg is displayed', async (): Promise<void> => {
    const response = await request.get('/image?filename=starrynight.jpg');
    expect(response.status).toBe(200);
  });

  // Test Case: Ensure a 400 status is returned when trying to view a non-existent image
  it('expects 400 status if image from filename=test.jpg is not part of original directory and cannot be displayed', async (): Promise<void> => {
    const response = await request.get('/image?filename=test.jpg');
    expect(response.status).toBe(400);
  });
});

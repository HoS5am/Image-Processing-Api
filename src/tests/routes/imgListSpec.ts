import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

// Test Suite: Testing the images list endpoint /api/
describe('suite for testing images list page endpoint response /api/', () => {

  // Test Case: Ensures that the server responds with status 200
  // when the image file list is successfully retrieved
  it('expects 200 status if image file list is displayed', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

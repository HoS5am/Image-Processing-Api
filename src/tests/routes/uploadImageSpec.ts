import request from 'supertest';
import express from 'express';
import path from 'path';
import fs from 'fs';
import uploadImage from '../../routes/api/uploadImage';

const app = express();
app.use('/upload', uploadImage);

// Test Suite: Testing image upload functionality at POST /upload
describe('POST /upload', () => {
  const testImagePath = path.join(__dirname, '../../test-assets/test.jpg');
  const nonImagePath = path.join(__dirname, '../../test-assets/test.txt');
  const uploadedImagePath = path.resolve(__dirname, '../../../images/original/test.jpg');

  beforeAll(() => {
    // Create a dummy test image file (fake JPEG header)
    fs.mkdirSync(path.dirname(testImagePath), { recursive: true });
    fs.writeFileSync(testImagePath, Buffer.from([0xff, 0xd8, 0xff]), 'binary');

    // Create a non-image file for testing rejection
    fs.writeFileSync(nonImagePath, 'This is a test file.', 'utf-8');
  });

  afterAll(() => {
    // Cleanup the uploaded test image if it exists
    if (fs.existsSync(uploadedImagePath)) {
      fs.unlinkSync(uploadedImagePath);
    }

    // Remove the test image and other dummy files after tests
    fs.rmSync(path.dirname(testImagePath), { recursive: true, force: true });
  });

    // Test Case: Successfully upload a valid JPEG image
    it('should upload a valid JPEG image successfully', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('image', testImagePath);

    // Ensure the response is 200 and the correct response body is returned
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Image uploaded successfully!',
      filename: 'test.jpg'
    });
    // Check if the image was saved in the expected directory
    expect(fs.existsSync(uploadedImagePath)).toBeTrue();
  });

    // Test Case: Reject non-jpeg files
    it('should reject non-jpg/jpeg files', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('image', nonImagePath);

    // Expecting server error (500) because file type is not valid
    expect(res.status).toBe(500);
  });

  
    // Test Case: Reject the request when no file is uploaded
    it('should reject when no file is uploaded', async () => {
    const res = await request(app)
      .post('/upload');

    // Expecting a 400 error with an error message about missing file
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No file uploaded.');
  });
});

import imgExists from '../../utilities/exist';
import path from 'path';

describe('Image exists module suite tests', () => {
  // Test Case: Verifies that the image exists at the specified path and returns true
  it('expects true since starrynight.jpg from original directory exists', async (): Promise<void> => {
    const imageDir = path.resolve(
      __dirname,
      `../../../images/original/starrynight.jpg`,
    );
    const img = imgExists(imageDir);
    expect(img).toEqual(true); // Expecting 'true' since the file exists
  });

  // Test Case: Verifies that the image does not exist at the specified path and returns false
  it('expects false since test.jpg from original directory does not exist', async (): Promise<void> => {
    const imageDir = path.resolve(__dirname, `../../../images/full/test.jpg`);
    const img = imgExists(imageDir);
    expect(img).toEqual(false); // Expecting 'false' since the file does not exist
  });
});

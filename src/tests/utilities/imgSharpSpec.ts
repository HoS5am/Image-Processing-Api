import resizeImg from '../../utilities/sharp';
import path from 'path';

const imageDir = path.resolve(
  __dirname,
  `../../../images/original/starrynight.jpg`,
);

describe('suite for testing sharp module', () => {

  // Test Case: Verifies that the image is successfully resized and returns true
  it('expects true if image is correctly resized and all details are provided', async () => {
    const imagResize: boolean = await resizeImg(
      300,
      350,
      imageDir,
      'starrynight.jpg',
    );
    expect(imagResize).toEqual(true); // Expecting 'true' for successful resizing
  });

  // Test Case: Verifies that resizing an image incorrectly (e.g., wrong path) returns false
  it('expects false if image is not correctly resized', async () => {
    const imageDir = path.resolve(
      __dirname,
      `../../../images/full/starrynight.jpg`,
    );

    const imagResize: boolean = await resizeImg(
      300,
      300,
      imageDir,
      'supra.jpg',
    );
    expect(imagResize).toEqual(false); // Expecting 'false' for failure in resizing
  });
});

import getFileExtension from '../../utilities/fileExtension';

describe('suite for testing the file extension', () => {

  // Test Case: Verifies that the correct file extension is returned for the given file name
  it('expects jpg as the file extension of starrynight.jpg', async () => {
    const fileExtend = getFileExtension('starrynight.jpg');
    expect(fileExtend).toEqual('jpg'); // Expecting 'jpg' as the file extension
  });
});

import getFileName from '../../utilities/fileName';

describe('suite for testing the name of the file', () => {
  // Test Case: Verifies that the correct file name is returned without the extension
  it('expects starrynight as the file name of starrynight.jpg', async () => {
    const fileExtend = getFileName('starrynight.jpg');
    expect(fileExtend).toEqual('starrynight'); // Expecting 'starrynight' as the file name without extension
  });
});

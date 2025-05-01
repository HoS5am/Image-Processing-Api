import getFileName from '../../utilities/fileName';

describe('suite for testing the name of the file', () => {
    it('expects starrynight as the file name of starrynight.jpg', async () => {
        const fileExtend = getFileName('starrynight.jpg');
        expect(fileExtend).toEqual('starrynight');
    });
});

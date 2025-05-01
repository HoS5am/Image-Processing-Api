import getFileExtension from "../../utilities/fileExtension";

describe('suite for testing the file extension', () => {
    it('expects jpg as the file extension of starrynight.jpg', async () => {
        const fileExtend = getFileExtension('starrynight.jpg');
        expect(fileExtend).toEqual('jpg');
    });
});

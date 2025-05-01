import imgExists from '../../utilities/exist';
import path from 'path';

describe('Image exists module suite tests', () => {
    it('expects true since starrynight.jpg from original directory exists', async (): Promise<void> => {
        const imageDir = path.resolve(
            __dirname,
            `../../../images/original/starrynight.jpg`
        );
        const img = imgExists(imageDir);
        expect(img).toEqual(true);
    });

    it('expects false since test.jpg from original directory does not exist', async (): Promise<void> => {
        const imageDir = path.resolve(
            __dirname,
            `../../../images/full/test.jpg`
        );
        const img = imgExists(imageDir);
        expect(img).toEqual(false);
    });
});

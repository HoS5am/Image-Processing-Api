import resizeImg from '../../utilities/sharp';
import path from 'path';


const imageDir = path.resolve(
    __dirname,
    `../../../images/original/starrynight.jpg`
);

describe('suite for testing sharp module', () => {
    it('expects true if image is correctly resized and all details are provided', async () => {
        const imagResize: boolean = await resizeImg(
            300,
            350,
            imageDir,
            'starrynight.jpg'
        );
        expect(imagResize).toEqual(true);
    });

    it('expects false if image is not correctly resized', async () => {
        const imageDir = path.resolve(
            __dirname,
            `../../../images/full/starrynight.jpg`
        );

        const imagResize: boolean = await resizeImg(
            300,
            300,
            imageDir,
            'fjord.jpg'
        );
        expect(imagResize).toEqual(false);
    });
});

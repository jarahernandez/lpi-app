export class FormulaImages {
    static images = [
        {
            name: 'aruba.png',
            image: require('../img/aruba.png')
        },
        {
            name: 'bermuda.png',
            image: require('../img/bermuda.png')
        },
        {
            name: 'madagascar.png',
            image: require('../img/madagascar.png')
        },
        {
            name: 'montego.png',
            image: require('../img/montego.png')
        },
        {
            name: 'altima-blue.png',
            image: require('../img/altima-blue.png')
        },
    ];

    static NumberOfImages = FormulaImages.images.length;

    static getImage = (formulaName) => {
        const found = FormulaImages.images.find((e) => e.name === formulaName);
        return found ? found.image : null;
    }
}
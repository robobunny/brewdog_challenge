import getBeerInfo from './getBeerInfo.js'

const api = {
    getBeerInfo,
};

export const settings = {
    brewdogApiUrl: 'https://api.punkapi.com/v2/beers?per_page=80&start=80',
    neededBeerFields: ('name tagline description ingredients image_url '
        +'abv ibu method').split(' '),
};

export default api;

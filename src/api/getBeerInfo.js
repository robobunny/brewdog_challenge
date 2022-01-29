import _ from 'lodash';

const displayFields = 'name tagline description image_url abv ibu ingredients method'
    .split(' ');

export default async function getBeerInfo () {
    const brewdogApiUrl = 'https://api.punkapi.com/v2/beers?per_page=80&start=80';
    const res = await fetch(brewdogApiUrl,
        {method: 'GET', mode: 'cors', redirect: 'follow'});
    if (!res.ok) {
        throw new Error('There was a problem requesting the data, '
            +'please try again later.');
    }
    try {
        const parsed = await res.json();
        return parsed.map(beer=>_.pick(beer, displayFields));
    } catch (e) { throw e };
};

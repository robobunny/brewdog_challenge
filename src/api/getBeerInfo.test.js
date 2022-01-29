import getBeerInfo from './getBeerInfo';
import fakeBeerInfo from '../__test__/fakeBeerInfo.json';
import fakeBeerInfoParsed from '../__test__/fakeBeerInfoParsed.json';

// XXX in real life it's better to use a lib like nock
Object.defineProperty(global, 'fetch', {value: jest.fn()});
const mockFetch = opt=>fetch.mockImplementation(()=>{
    let body = opt.body ? JSON.stringify(opt.body) : 'OK';
    return new Response(body, {status: opt.status||200});
});

describe('getBeerInfo', ()=>{
    beforeEach(()=>{
        fetch.mockClear();
    });
    test('calls the api url with fetch', async ()=>{
        mockFetch({body: fakeBeerInfo});
        let res = await getBeerInfo();
        expect(res).toEqual(fakeBeerInfoParsed);
    });
});

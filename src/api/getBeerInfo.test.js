import getBeerInfo from "./getBeerInfo";
import fakeBeerInfo from "../__test__/fakeBeerInfo.json";
import fakeBeerInfoParsed from "../__test__/fakeBeerInfoParsed.json";
import { settings } from "./settings";

// XXX in real life it's better to use a lib like nock
Object.defineProperty(global, "fetch", { value: jest.fn() });
const mockFetch = (opt) =>
    fetch.mockImplementation(() => {
        let body = opt.body ? JSON.stringify(opt.body) : "OK";
        return new Response(body, { status: opt.status || 200 });
    });

describe("getBeerInfo", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    test("gets the beer info", async () => {
        mockFetch({ body: fakeBeerInfo });
        let res = await getBeerInfo();
        expect(res).toEqual(fakeBeerInfoParsed);
    });
    test("parses info about dry-hopped beer", async () => {
        mockFetch({
            body: fakeBeerInfo.map((beer) => ({
                ...beer,
                ingredients: {
                    ...beer.ingredients,
                    hops: [
                        ...beer.ingredients.hops,
                        {
                            name: "Test dry hops",
                            add: "dry hop",
                        },
                    ],
                },
            })),
        });
        let res = await getBeerInfo();
        for (let beer of res) expect(beer.isDryHopped).toBe(true);
    });
    test("parses info about beer containing lactose", async () => {
        mockFetch({
            body: fakeBeerInfo.map((beer) => ({
                ...beer,
                method: {
                    ...beer.method,
                    twist: "Lactose",
                },
            })),
        });
        let res = await getBeerInfo();
        for (let beer of res) expect(beer.containsLactose).toBe(true);
    });
    test("404 -> empty array", async () => {
        mockFetch({ body: "Not Found", status: 404 });
        let res = await getBeerInfo();
        expect(res).toEqual([]);
    });
});

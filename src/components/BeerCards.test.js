import { render, screen, cleanup } from "@testing-library/react";
import BeerCards from "./BeerCards";
import { testBeer, lactoseBeer, dryHopBeer } from "../__test__/testBeers";
import useDataLoader from "../hooks/useDataLoader";

jest.mock("../hooks/useDataLoader", () => ({
  __esModule: true,
  default: jest.fn(),
}));

afterEach(() => cleanup());

describe("getBeerInfo hasn't resolved yet", () => {
  test("renders 'Loading info about beer...'", () => {
    useDataLoader.mockImplementation(() => ({
      isLoading: true,
      data: null,
    }));
    render(<BeerCards />);
    const loading = screen.getByText("Loading info about beer...");
    expect(loading).toBeInTheDocument();
  });
});

describe("once info about the beer is loaded", () => {
  test("renders a BeerCard for each beer", async () => {
    useDataLoader.mockImplementation(() => ({
      isLoading: false,
      data: [testBeer, lactoseBeer, dryHopBeer],
    }));
    render(<BeerCards />);
    const cards = await screen.findAllByText("PBR");
    expect(cards.length).toBe(3);
  });
  test("Displays a message when beers.length==0", () => {
    useDataLoader.mockImplementation(() => ({
      isLoading: false,
      data: [],
    }));
    render(<BeerCards />);
    const message = screen.getByText("Couldn't find any beers to display");
    expect(message).toBeInTheDocument();
  });
  test("Displays a message when !beers", () => {
    useDataLoader.mockImplementation(() => ({
      isLoading: false,
      data: undefined,
    }));
    render(<BeerCards />);
    const message = screen.getByText("Couldn't find any beers to display");
    expect(message).toBeInTheDocument();
  });
});

describe("when there's an error loading the beers", () => {
  test("displays a collapsible error message", () => {
    let once = false;
    useDataLoader.mockImplementation((_, handleError) => {
      if (!once) {
        handleError();
        once = true;
      }
      return { isLoading: false, data: null };
    });
    render(<BeerCards />);
    const message = screen.getByText(
      "There was an error loading the beer data."
    );
    expect(message).toBeInTheDocument();
  });
});

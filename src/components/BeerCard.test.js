import { render, screen, cleanup } from "@testing-library/react";
import BeerCard from "./BeerCard";
import { testBeer, lactoseBeer, dryHopBeer } from "../__test__/testBeers";

test("renders all the correct info about the beer", () => {
  render(<BeerCard beer={testBeer} />);
  const elements = {
    name: screen.getByText("PBR"),
    tagline: screen.getByText("It will get you drunk"),
    description: screen.getByText("An amazing beer"),
    // XXX this is not a good alt-text
    image: screen.getByAltText(/logo for the BrewDog beer PBR/),
    abv: screen.getByText("10"),
    ibu: screen.getByText("73"),
  };
  for (let el of Object.values(elements)) expect(el).toBeInTheDocument();
});
test("renders warning if a beer contains lactose", () => {
  render(<BeerCard beer={lactoseBeer} />);
  let lactoseWarning = screen.getByText("This beer contains lactose");
  expect(lactoseWarning).toBeInTheDocument();
});
test("renders info if a beer is dry-hopped", () => {
  render(<BeerCard beer={dryHopBeer} />);
  let dryHopHighlight = screen.getByText("This beer is dry-hopped");
  expect(dryHopHighlight).toBeInTheDocument();
});

//  lactose_warning: screen.getByText('This beer )
//  lactose_warning_icon: screen.getByAltText('cow icon'),

import { render, screen } from "@testing-library/react";
import BeerCard from "./BeerCard";
import fakeBeerInfoParsed from "../__test__/fakeBeerInfoParsed.json";
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
    Object.values(elements).forEach((el) => expect(el).toBeInTheDocument());
});

//  lactose_warning: screen.getByText('This beer )
//  lactose_warning_icon: screen.getByAltText('cow icon'),

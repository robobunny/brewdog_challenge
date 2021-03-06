export const testBeer = {
  name: "PBR",
  tagline: "It will get you drunk",
  description: "An amazing beer",
  imageUrl: "www.example.com/img/PBR",
  abv: 10.0,
  ibu: 73,
  containsLactose: false,
  isDryHopped: false,
};

export const lactoseBeer = {
  ...testBeer,
  containsLactose: true,
};

export const dryHopBeer = {
  ...testBeer,
  isDryHopped: true,
};

import _ from "lodash";
import { settings } from "./settings";

const { brewdogApiUrl, neededBeerFields } = settings;

export default async function getBeerInfo() {
  try {
    const data = await fetchBeersInfo();
    return data.map(parseBeerInfo);
  } catch (e) {
    return [];
  }
}

async function fetchBeersInfo() {
  const res = await fetch(brewdogApiUrl, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(
      "There was a problem requesting the data, " + "please try again later."
    );
  }
  try {
    return await res.json();
  } catch (e) {
    throw new Error(`Couldn't parse json response: ${e}`);
  }
}

function parseBeerInfo(beer) {
  beer = _.pick(beer, neededBeerFields);
  beer.isDryHopped = beer.ingredients?.hops?.some((h) => h.add === "dry hop");
  beer.containsLactose = !!beer.method?.twist?.match(/lactose/i);
  beer.imageUrl = beer.image_url;
  delete beer.image_url;
  delete beer.ingredients;
  delete beer.method;
  return beer;
}

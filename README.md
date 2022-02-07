# Beer coding challenge

To install the app locally, clone the repo and then:

```bash
yarn install
```

To start the dev server:

```bash
yarn start
```

To run the tests:

```bash
yarn test
```

## Requirements as I understand them

Display info from BrewDog brewery endpoint: https://api.punkapi.com/v2/beers?per_page=80

Use:

- React
- Material-UI library (https://mui.com/components/)

### Data to display for each beer

- Name
- Tagline
- Description
- Image
- ABV
- IBU
- Warning of some sort if the beer contains lactose
- Highlight in some way if the beer is dry hopped

Results sorted by ABV, in descending order

### Notes about decisions I made and other tools I used

#### Problem solving > display

I'm aware that the site doesn't look good and isn't very accessibility-friendly or responsive. I'm aware that these are huge design flaws that, in any production-level product, would be unacceptable. I have a finite amount of time for this project and I'm taking a calculated risk that you're less concerned about those sorts of things than about the problem-solving aspects of my code, for example: how many levels of abstraction I'm applying to the problem.

#### Defer

I used an implementation of defer in useDataLoader.test.js that I copied off stackOverflow to save some time. It's not a very difficult pattern but I wanted to be up front about the code not being my own. Obviously in the real world, a tool like this would be its own module with its own tests, a more robust implementation, etc. but I just wanted a bare-bones way to deterministically make a promise resolve at a certain point in the test code.

#### Prettier

I don't actually like the way it looks, but I used prettier with the default config to format the code so that it's all uniform.

## My goals for this challenge

I want to show:

- good tests and clear evidence of TDD
-

I enjoy doing strict TDD when I can. Sof to for the react components and auxiliary functions (like the one that calls the API),
I'll write the tests first then write the code till the tests pass.

Once I have the components made, I'll render the app in a browser and make sure the CSS looks presentable.
My goal is not to open a browser at all until the app is basically done.
This makes iteration way faster than relying on visual feedback for every aspect of development.
It also helps avoid context switching and focus on solving one problem at a time.
I don't have to ensure that the visual feedback of the page is correct/meaningful in order to be sure the data handling is working.

## Scratch Pad / Brainstorm / Showing my work

### shape of data

API returns array of:

```js
beer: {
    name: String,
    tagline: String,
    description: String,
    image_url: String,
    abv: Number,
    ibu: Number,
    ingredients: Object {
        malt: Array[Object],
        hops: Array[Object {
            ...
            add: String, // =='dry hop' for beer is dry-hopped,
        }],
    },
    method: Object {
        twist: String, // match '/lactose/i' to find beer contains lactose
    },
}
```

#### one example beer jq'd:

```json
{
  "name": "Buzz",
  "tagline": "A Real Bitter Experience.",
  "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
  "image_url": "https://images.punkapi.com/v2/keg.png",
  "abv": 4.5,
  "ibu": 60,
  "ingredients": {
    "malt": [
      {
        "name": "Maris Otter Extra Pale",
        "amount": {
          "value": 3.3,
          "unit": "kilograms"
        }
      },
      {
        "name": "Caramalt",
        "amount": {
          "value": 0.2,
          "unit": "kilograms"
        }
      },
      {
        "name": "Munich",
        "amount": {
          "value": 0.4,
          "unit": "kilograms"
        }
      }
    ],
    "hops": [
      {
        "name": "Fuggles",
        "amount": {
          "value": 25,
          "unit": "grams"
        },
        "add": "start",
        "attribute": "bitter"
      },
      {
        "name": "First Gold",
        "amount": {
          "value": 25,
          "unit": "grams"
        },
        "add": "start",
        "attribute": "bitter"
      },
      {
        "name": "Fuggles",
        "amount": {
          "value": 37.5,
          "unit": "grams"
        },
        "add": "middle",
        "attribute": "flavour"
      },
      {
        "name": "First Gold",
        "amount": {
          "value": 37.5,
          "unit": "grams"
        },
        "add": "middle",
        "attribute": "flavour"
      },
      {
        "name": "Cascade",
        "amount": {
          "value": 37.5,
          "unit": "grams"
        },
        "add": "end",
        "attribute": "flavour"
      }
    ],
    "yeast": "Wyeast 1056 - American Ale™"
  },
  "method": {
    "mash_temp": [
      {
        "temp": {
          "value": 64,
          "unit": "celsius"
        },
        "duration": 75
      }
    ],
    "fermentation": {
      "temp": {
        "value": 19,
        "unit": "celsius"
      }
    },
    "twist": null
  }
}
```

# Beer coding challenge

## Requirements as I understand them

Display info from BrewDog brewery endpoint: https://api.punkapi.com/v2/beers?per_page=80

Use:

* React
* Material-UI library (https://mui.com/components/)

### Data to display for each beer

* Name
* Tagline
* Description
* Image
* ABV
* IBU
* Warning of some sort if the beer contains lactose
* Highlight in some way if the beer is dry hopped

Results sorted by ABV, in descending order

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


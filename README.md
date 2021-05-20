
## Project Goals

Need to be able to generate items.

Given base item type, create some varient, specifying rarity and approximate rarities

```js
items.generate('book', {})
```


Item --|> Property
Item --|> State
Item --|> Attribute (derived from state & properties)


:Item { name: 'book' } -[:WHEN { noteworthy: false }]-> :State { name: 'dry'}
:Item { name: 'book' } -[:WHEN { noteworthy: true }]-> :State { name: 'wet'}


Goal item name: "lost tome of enchanting, vol 1"

"lost" - describes ownership, classified as noteworthy
"tome" - synonym, with tag like "mysterious"
"of" - purpose prefix
"enchanting" - purpose, with tag like "mysterious", "magical", "action"
"vol x" - optional property, part of a set

## Development

Setup is just `npm install`

### Run the neo4j server

There are two npm targets for the neo4j: `setup` and `server`.

Run the setup script during first time setup:

```shell
npm run neo4j:setup
```

Then start the service:

```shell
npm run neo4j:server
```

Then open the neo4j web browser at: http://localhost:7474/browser/


const neo4j = require('neo4j-driver')

const main = async () => {

  const uri = 'bolt://localhost'

  const driver = neo4j.driver(uri)


  const item = 'book';
  const theme = 'common';
  // const theme = null;

  const generateBookName = async () => {
    const session = driver.session();
    // Get a purpose for the book
    const purposeResult = await session.run(`
      MATCH (i:Item) -[:HAS]-> (p:Purpose)
      WHERE i.name = $item
        AND ( 'common' IN p.themes OR $theme IN p.themes )
      RETURN p
    `, { item, theme });

    const purposeIndex = Math.floor(Math.random() * purposeResult.records.length);
    const purpose = purposeResult.records[purposeIndex];

    // console.log("\nPurpose:")
    // console.log(purpose.get(0).properties);

    // Get the properties of the book
    const propertyResult = await session.run(`
      MATCH (i:Item) -[:HAS]-> (p:Property)
      WHERE i.name = $item
        AND ( 'common' IN p.themes OR $theme IN p.themes )
      RETURN p
    `, { item, theme });

    const properties = propertyResult.records.map(r => r.get(0).properties);

    // console.log("\nProperties:")
    // console.log(properties);

    // Get the synonyms for the book
    const synonymResult = await session.run(`
      MATCH (i:Item) -[r:CANBE]-> (s:Synonym)
      WHERE i.name = $item
        AND ( $theme IN s.themes OR $purpose IN r.purpose )
      RETURN s
    `, { item, theme, purpose: purpose.get(0).properties.name });

    const synonymIndex = Math.floor(Math.random() * synonymResult.records.length);
    const synonym = synonymResult.records[synonymIndex];

    // console.log("\nSynonym:")
    // console.log(synonym.get(0).properties);

    // Get the state for the book
    const stateResult = await session.run(`
      MATCH (i:Item) -[:CANBE]-> (s:State)
      WHERE i.name = $item
      RETURN s
    `, { item });

    const stateIndex = Math.floor(Math.random() * stateResult.records.length);
    const state = stateResult.records[stateIndex];

    // console.log("\nState:")
    // console.log(state.get(0).properties);

    // Get the adjective for the book
    const adjectiveResult = await session.run(`
      MATCH (i:Item) -[r:CANBE]-> (a:Adjective)
      WHERE i.name = $item AND $state IN r.states
      RETURN a
    `, { item, state: state.get(0).properties.name });

    const adjectiveIndex = Math.floor(Math.random() * adjectiveResult.records.length);
    const adjective = adjectiveResult.records[adjectiveIndex];

    // console.log("\nAdjective:")
    // console.log(adjective.get(0).properties);

    const adjectiveName = adjective.get(0).properties.name;
    const synonymName = synonym.get(0).properties.name
    const purposeName = purpose.get(0).properties.name
    const postfix = purposeName === 'common' ? '' : ` of ${purposeName}`;
    const finalName = `${adjectiveName} ${synonymName}${postfix}`;
    await session.close();
    return finalName;
  };

  try {
    const bookItems = await Promise.all(
      Array(100).fill(undefined).map(() => generateBookName())
    );
    console.log(bookItems);
  } finally {
    // await session.close();
    await driver.close();
  }

};

(async function() {
  await main().catch(console.log);
}());

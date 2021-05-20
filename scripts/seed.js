
const neo4j = require('neo4j-driver')

const main = async () => {

  const uri = 'bolt://localhost'

  const driver = neo4j.driver(uri)
  const session = driver.session();

  // Clear the db first
  await session.run('MATCH (p) DETACH DELETE p');

  // Seed some stuff about a book
  await session.run(`
    CREATE
      (i:Item { name: 'book' }),

      (t1:State { name: 'okay' }),
      (t2:State { name: 'atypical' }),
      (t3:State { name: 'damaged' }),

      (a1:Adjective { name: 'dry',               themes: ['common'] }),
      (a2:Adjective { name: 'wet',               themes: ['common'] }),
      (a3:Adjective { name: 'tattered',          themes: ['common'] }),
      (a4:Adjective { name: 'torn',              themes: ['common'] }),
      (a5:Adjective { name: 'unread',            themes: ['common'] }),
      (a6:Adjective { name: 'handwritten',       themes: ['common'] }),
      (a7:Adjective { name: 'ancient',           themes: ['common'] }),
      (a8:Adjective { name: 'unending',          themes: ['common'] }),    // book relation: 'common'
      (a9:Adjective { name: 'bewitched',         themes: ['magic'] }),     // book relation: 'magic'
      (a10:Adjective { name: 'lost',             themes: ['common'] }),    // book relation: 'mysterious'
      (a11:Adjective { name: 'forgotton',        themes: ['common'] }),    // book relation: 'mysterious'
      (a12:Adjective { name: 'banished',         themes: ['common'] }),    // book relation: 'mysterious'
      (a13:Adjective { name: 'forbidden',        themes: ['common'] }),    // book relation: 'common'
      (a14:Adjective { name: 'empty',            themes: ['common' ] }),  // book relation: 'mysterious'
      (a15:Adjective { name: 'invisible',        themes: ['common'] }),    // book relation: 'mysterious', 'magic'
      (a16:Adjective { name: 'living',            themes: ['common'] }),    // book relation: 'magic'
      (a17:Adjective { name: 'screaming',        themes: ['common'] }),    // book relation: 'magic'
      (a18:Adjective { name: 'pageless',         themes: ['common'] }),    // book relation: 'damaged'
      (a19:Adjective { name: 'burnt',            themes: ['common'] }),    // book relation: 'damaged'
      (a20:Adjective { name: 'disintigrating',   themes: ['common'] }),    // book relation: 'damaged'
      (a21:Adjective { name: 'curled',           themes: ['common'] }),    // book relation: 'damaged'
      (a22:Adjective { name: 'warped',           themes: ['common'] }),    // book relation: 'damaged'

      (s1:Synonym { name: 'tome',         themes: ['common'] }),
      (s2:Synonym { name: 'publication',  themes: ['common'] }),
      (s3:Synonym { name: 'opus',         themes: ['common'] }),
      (s4:Synonym { name: 'treatise',     themes: ['common'] }),
      (s5:Synonym { name: 'handbook',     themes: ['common'] }),
      (s6:Synonym { name: 'manual',       themes: ['common'] }),
      (s7:Synonym { name: 'novel',        themes: ['common'] }),
      (s8:Synonym { name: 'ledger',       themes: ['common'] }),
      (s9:Synonym { name: 'journal',      themes: ['common'] }),
      (s10:Synonym { name: 'chronicle',   themes: ['common'] }),
      (s11:Synonym { name: 'diary',       themes: ['common'] }),
      (s12:Synonym { name: 'daybook',     themes: ['common'] }),
      (s13:Synonym { name: 'storybook',   themes: ['common'] }),
      (s14:Synonym { name: 'book',        themes: ['common'] }),

      (p1:Purpose { name: 'enchanting',     themes: ['magic'] }),
      (p2:Purpose { name: 'education',      themes: ['common'] }),
      (p3:Purpose { name: 'common',         themes: ['common'] }),
      (p4:Purpose { name: 'recordkeeping',  themes: ['common'] }),
      (p5:Purpose { name: 'storytelling',   themes: ['common'] }),

      (y1:Property { name: 'volume_number', themes: ['common'] }),
      (y2:Property { name: 'author', themes: ['common'] }),

      (i)-[:CANBE]->(t1),
      (i)-[:CANBE]->(t2),
      (i)-[:CANBE]->(t3),

      (i)-[:CANBE { states: [t1.name] }]->(a1),
      (i)-[:CANBE { states: [t3.name] }]->(a2),
      (i)-[:CANBE { states: [t3.name] }]->(a3),
      (i)-[:CANBE { states: [t3.name] }]->(a4),
      (i)-[:CANBE { states: [t2.name] }]->(a5),
      (i)-[:CANBE { states: [t2.name] }]->(a6),
      (i)-[:CANBE { states: [t2.name] }]->(a7),
      (i)-[:CANBE { states: [t1.name] }]->(a8),
      (i)-[:CANBE { states: [t2.name] }]->(a9),
      (i)-[:CANBE { states: [t1.name] }]->(a10),
      (i)-[:CANBE { states: [t2.name] }]->(a11),
      (i)-[:CANBE { states: [t2.name] }]->(a12),
      (i)-[:CANBE { states: [t2.name] }]->(a13),
      (i)-[:CANBE { states: [t2.name] }]->(a14),
      (i)-[:CANBE { states: [t2.name] }]->(a15),
      (i)-[:CANBE { states: [t2.name] }]->(a16),
      (i)-[:CANBE { states: [t2.name] }]->(a17),
      (i)-[:CANBE { states: [t3.name] }]->(a18),
      (i)-[:CANBE { states: [t3.name] }]->(a19),
      (i)-[:CANBE { states: [t3.name] }]->(a20),
      (i)-[:CANBE { states: [t3.name] }]->(a21),
      (i)-[:CANBE { states: [t3.name] }]->(a22),

      (i)-[:CANBE { purpose: ['common', 'education'] } ]->(s1),
      (i)-[:CANBE { purpose: ['common', 'education'] } ]->(s2),
      (i)-[:CANBE { purpose: ['common'] } ]->(s3),
      (i)-[:CANBE { purpose: ['common', 'education', 'recordkeeping'] } ]->(s4),
      (i)-[:CANBE { purpose: ['common', 'education'] } ]->(s5),
      (i)-[:CANBE { purpose: ['common', 'education'] } ]->(s6),
      (i)-[:CANBE { purpose: ['common', 'storytelling'] } ]->(s7),
      (i)-[:CANBE { purpose: ['common', 'recordkeeping'] } ]->(s8),
      (i)-[:CANBE { purpose: ['common', 'recordkeeping'] } ]->(s9),
      (i)-[:CANBE { purpose: ['common', 'recordkeeping', 'storytelling'] } ]->(s10),
      (i)-[:CANBE { purpose: ['common', 'recordkeeping'] } ]->(s11),
      (i)-[:CANBE { purpose: ['common', 'recordkeeping'] } ]->(s12),
      (i)-[:CANBE { purpose: ['common', 'storytelling'] } ]->(s13),
      (i)-[:CANBE { purpose: ['common'] } ]->(s14),

      (i)-[:HAS]->(p1),
      (i)-[:HAS]->(p2),
      (i)-[:HAS]->(p3),
      (i)-[:HAS]->(p4),
      (i)-[:HAS]->(p5),

      (i)-[:HAS]->(y1),
      (i)-[:HAS]->(y2)
  `);

  await session.close();
  await driver.close();

};

(async function() {
  await main();
}());
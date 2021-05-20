
module.exports = ({ client }) => {

  const list = async () => {
    // const result = await session.run(
    //   'CREATE (a:Person {name: $name}) RETURN a',
    //   { name: personName }
    // );
    const result = await client.session.run('MATCH (i:Item) RETURN i');
    return result.records.map(r => r.get(0).properties);
  };

  return {
    list
  };
};

const neo4j = require('neo4j-driver')

class Neo4jWrapper  {
  constructor ({ uri }) {
    this.driver = neo4j.driver(uri)
    this.session = null
  };

  async connect() {
    this.session = this.driver.session();
  }

  async close() {
    await this.session.close();
    await this.driver.close();
  }
}

module.exports = ({ uri }) => {

  const client = new Neo4jWrapper({uri})

  const connect = () => client.connect();

  const close = async () => client.close();

  const item = require('./item')({ client });

  return {
    connect,
    close,
    item
  };
};

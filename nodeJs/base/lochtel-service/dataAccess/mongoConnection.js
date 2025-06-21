const mongoClient = require('mongodb').MongoClient;

const getDocument = async(mongo_uri, mongo_db, mongo_collection, mongo_query, mongo_options) => {
  let documentResult = {
    codError: '0',
    message: '',
    data: []
  };
  const client = new mongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 3000, serverSelectionTimeoutMS: 3000 });
  try {
    await client.connect();
    const db = client.db(mongo_db);
    const collection = db.collection(mongo_collection);
    const doQuery = new Promise((resolve) => {
      collection.find(mongo_query, mongo_options).toArray(function(err, result) {
        documentResult.data = result;
        resolve();
      });
    });
    await doQuery;
  } catch (e) {
    documentResult.codError = 'MONGO';
    documentResult.message = e;
  } finally {
    await client.close();
  }
  return documentResult;
};

const saveDocument = async(model, mongo_url, mongo_db, mongo_collection) => {
  const client = new mongoClient(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 3000, serverSelectionTimeoutMS: 3000 });
  let documentResult = {
    codError: '0',
    message: '',
    data: []
  };
  try {
    await client.connect();
    const db = client.db(mongo_db);
    const collection = db.collection(mongo_collection);
    let stateInsert = await collection.insertOne(model);
    documentResult.data = { 
      id: stateInsert.insertedId 
    };
  } catch (e) {
    console.log('error mongo one: ' + JSON.stringify(e));
    documentResult.codError = 'MONGO';
    documentResult.message = e;
    documentResult.data = null;
  } finally {
    await client.close();
  }
  return documentResult;
};

const updateDocument = async(model, mongo_url, mongo_db, mongo_collection) => {
  const client = new mongoClient(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 3000, serverSelectionTimeoutMS: 3000 });
  let documentResult = {
    codError: '0',
    message: '',
    data: []
  };
  try {
    await client.connect();
    const db = client.db(mongo_db);
    const collection = db.collection(mongo_collection);
    let stateInsert = await collection.replaceOne(model);
    documentResult.data = { 
      id: stateInsert.insertedId 
    };
  } catch (e) {
    console.log('error mongo one: ' + JSON.stringify(e));
    documentResult.codError = 'MONGO';
    documentResult.message = e;
    documentResult.data = null;
  } finally {
    await client.close();
  }
  return documentResult;
};

module.exports = {
  getDocument,
  saveDocument,
  updateDocument
};
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri =
  process.env.MONGODB_URI || null;

if (!uri) {
  throw new Error("MONGO_DB Connection is not provided");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//To Export db and db.getCollection()
const db = client.db("backendSekolah");

const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

module.exports = { db, getCollection };
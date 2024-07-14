import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  process.env.MONGO_DB || null;

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
export const db = client.db("backendSekolah");

export const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("Please define MONGODB_URI in your environment");
}

const options: Record<string, unknown> = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;


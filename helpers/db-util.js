import { MongoClient } from "mongodb";

export const DB_URL_NEWSLETTER =
  "mongodb+srv://user1:user1@cluster0.wb1uu.mongodb.net/newsletter?retryWrites=true&w=majority";

export const DB_URL_EVENTS =
  "mongodb+srv://user1:user1@cluster0.wb1uu.mongodb.net/events?retryWrites=true&w=majority";

export async function connectDatabaseNewsLetter() {
  return await MongoClient.connect(DB_URL_NEWSLETTER);
}
export async function connectDatabaseNewsEvents() {
  return await MongoClient.connect(DB_URL_EVENTS);
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  return await db.collection(collection).find().sort(sort).toArray();
}

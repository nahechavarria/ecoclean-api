import { MongoClient, Db } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'ecoclean_db';

let db: Db;

export async function connectDB() {
	const client = new MongoClient(MONGO_URI);
	await client.connect();
	db = client.db(DB_NAME);
	console.log('✅ MongoDB conectado');
}

export function getDB(): Db {
	if (!db) throw new Error('❌ Base de datos no conectada');
	return db;
}

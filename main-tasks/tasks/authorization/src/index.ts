import 'dotenv/config';
import { startServer } from './server';
import { connectMongo } from './db';

connectMongo();
startServer();

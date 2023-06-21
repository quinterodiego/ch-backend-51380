import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------MONGO------------------------------
import { connect } from 'mongoose';

export const connectMongo = async () => {
  try {
    await connect('mongodb+srv://d86webs:Diego859@cluster0.ahna6cz.mongodb.net/ecommerce');
    console.log('--** Connected database **--')
  } catch (e) {
    console.log(e);
    throw 'Can\'t connect to the db';
  }
}
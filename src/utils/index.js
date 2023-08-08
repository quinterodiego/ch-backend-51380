import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/* MONGODB */
import { connect } from 'mongoose';

export const connectMongo = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log('--** Connected database **--')
  } catch (e) {
    console.log(e);
    throw 'Can\'t connect to the db';
  }
}

/* BCRYPT */
import bcrypt from 'bcrypt'
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)
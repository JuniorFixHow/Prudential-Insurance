import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO = process.env.MONGO;

let isConnected = false;
export const ConnectDB = async()=>{
    mongoose.set('strictQuery', true);

    //don't attempt to reconnect if the connection is alredy active
    if(isConnected){
        console.log('Mongo has been connected already');
        return;
    }

    try {
        await mongoose.connect(MONGO);
        isConnected = true;
        console.log('Mongo has been connected successfully')
    } catch (error) {
        throw new Error('Connection to Mongoose failed!');
    }
}
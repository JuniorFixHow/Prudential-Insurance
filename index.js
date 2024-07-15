import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './ConnectDB.js';
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
ConnectDB();

//check connection for newtwork failures
mongoose.connection.on('connected', ()=>{
    console.log('Connection restored');
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Connection lost')
})
app.use('/api/users', UserRoutes);

const PORT = process.env.PORT || process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})
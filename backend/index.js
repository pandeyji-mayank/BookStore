import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

const app = express()

app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000;
const MongoDBURI = process.env.MongoDBURI;

try {
    mongoose.connect(MongoDBURI, {
    });
    console.log("connected to MongoDB");
} catch (error) {
    console.log("Eror : ", error);
}

//defining routes
app.use('/book', bookRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

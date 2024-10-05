import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Allow credentials (cookies, auth headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow only specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions));
// app.use(cors());
app.use('/uploads', express.static('uploads'));

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


app.use('/books', booksRoute);
app.use('/', userRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

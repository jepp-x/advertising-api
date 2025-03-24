import express from 'express';
import advertRouter from './router/advertroute.js';
import mongoose from 'mongoose';
import userRouter from './router/userroute.js';





// database connection
await mongoose.connect(process.env.MONGO_URI);

// create an express app
const app = express();

// use midlewares
app.use(express.json());

// user routers
app.use(advertRouter);
app.use(userRouter)


// listening port
const port = process.env.PORT || 4000;
app.listen(port,() =>{
    console.log(`Server is Active on ${port}`);
})
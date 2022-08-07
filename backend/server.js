import express from "express";
import { data } from "./data.js";
import config from "./config.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
console.log('mongo db url', mongodbUrl);
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason))

mongoose.connection
  .once('open', () => console.log('connected to mongo DB'))
  .on('error', (error) => {
    console.log("Your error is", error)
  });

const app = express();

app.use("/api/users/", userRoute)
app.get('/api/product/:id', (req, res) => {

  const productId = req.params.id;
  console.log(productId)

  const product = data.products.find(x => x._id === productId);

  if (product)
    res.send(product)
  else
    res.status(404).send({ msg: "Product not Found" })
});

app.get('/api/products', (req, res) => {
  console.log("request", req)
  res.send(data.products)
});

app.listen(5000, () => { console.log(" server started at http://localhost:5000") })
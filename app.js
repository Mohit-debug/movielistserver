const express = require('express');
const app = express();
const appRoutes = require("./api/routes");
const userRoutes =require("./api/routeuser")
const mongoose = require('mongoose');
const bodyPraser = require('body-parser');
const cors = require('cors');
const {isUser} = require("./api/middleware/auth.middleware")
const mongoDBUri = process.env.DB_URI;

//..
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected..');
});

mongoose.connection.on('error', (err) => {
  console.error('connection error:');
});

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send('Express API is up and  runnning.');
});

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());

app.use('/api', appRoutes);
app.use('/api',isUser,userRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started at port', port));

module.exports = app;

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { readdirSync } = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// create dynamic routes with readdirSync
readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;

//database connection mongo DB with mongoose
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB connection error to Mongo DB ', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

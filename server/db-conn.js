const mongoose = require('mongoose');

const { DB_CONN, DB_USER, DB_PW } = process.env;

mongoose
  .connect(DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('succesfully connected to DB (mongo on Azure)'))
  .catch(console.error);

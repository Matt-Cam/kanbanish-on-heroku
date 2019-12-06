const mongoose = require('mongoose');

const { DB_CONN, DB_USER, DB_PW } = process.env;

mongoose
  .connect(
    'mongodb+srv://matt-cam_1:nakedpen3@kanbancluster-dajo3.azure.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('succesfully connected to DB (mongo on Azure)'))
  .catch(console.error);
/*
THE INITIAL WAY THAT I HAD THIS SET UP
mongoose
  .connect(DB_CONN, {
    auth: {
      user: DB_USER,
      password: DB_PW
    },
    useNewUrlParser: true
  })
  .then(() => console.log('succesfully connected to DB (mongo on Azure)'))
  .catch(console.error);
*/

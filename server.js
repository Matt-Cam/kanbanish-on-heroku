require('dotenv').config();
//require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');
//const cardsRouter = require('./server/routes/cards-route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/api/cards/', cardsRouter);

const path = require('path');
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const { PORT } = process.env || 5001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

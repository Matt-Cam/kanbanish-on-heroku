require('dotenv').config();
require('./server/db-conn');
const express = require('express');
const bodyParser = require('body-parser');
const cardsRouter = require('./server/routes/cards-route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./client/kanban-react/build'));
app.use('/api/cards/', cardsRouter);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

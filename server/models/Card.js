const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  cardNumber: { type: Number, required: true },
  title: { type: String, required: true },
  list: { type: Array, required: true }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

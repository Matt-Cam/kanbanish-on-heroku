const router = require('express').Router();
const Card = require('../models/Card');

/**
 * URL: localhost:5001/api/Cards/
 * Response: array of all card documents
 */
router.get('/', (req, res, next) => {
  Card.find()
    .then(cards => res.status(200).json({ cards: cards }))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * URL: localhost:5001/api/cards/seed
 * Description: Used to give database some test data.
 */
router.post('/seed', async (req, res, next) => {
  for (let i = 0; i < 3; i++) {
    const newCard = new Card({
      cardNumber: i,
      title: `This is card ${i}`,
      list: [
        `item 1 for card ${i}`,
        `item 2 for card ${i}`,
        `item 3 for card ${i}`
      ]
    });
    await newCard.save();
  }
  res.send(
    'Run GET after this to see if the thoughts got seeded successfully  '
  );
});

// DELETE list item from card
// returns success message along with the newly updated card
router.post('/removeListItem/:cardId/:listItem', (req, res) => {
  Card.findById(req.params.cardId)
    .then(card => {
      card.list.splice(req.params.listItem, 1);
      card
        .save()
        .then(() =>
          res.json({
            message: `Succesfully deleted item ${req.params.listItem} from card # ${req.params.cardId}`,
            card: card
          })
        )
        .catch(err => res.status(400).json('Error in save: ' + err));
    })
    .catch(err => res.status(400).json('Error in fifnd (probably): ' + err));
});

// ADD list item to card
router.post('/addListItem/:cardId/', (req, res) => {
  Card.findById(req.params.cardId)
    .then(card => {
      card.list.push(req.body.listItemDesc);
      card
        .save()
        .then(() => {
          res.json({
            message: 'Succesfully added new item to db',
            card: card
          });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * URL: localhost:5001/api/Cards/add
 * Description: Used to add single card
 */
router.route('/add').post((req, res) => {
  const { title, cardNumber, list } = req.body;
  console.log(req.body);
  const newCard = new Card({ title, cardNumber, list });
  newCard
    .save()
    .then(() => res.json({ message: 'Card added!', card: newCard }))
    .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE ALL CARDS
router.delete('/', (req, res, next) => {
  Card.deleteMany({}, err => {
    if (err) next(err);
    else res.send('Succesfully deleted all cards');
  });
});

// GET max card number card, this is for example purposes
router.get('/max', async (req, res) => {
  const x = await Card.find()
    .sort('-cardNumber')
    .limit(1)
    .exec((error, data) => {
      console.log(data);
      return data;
    });
  console.log(x);
  res.send('hello');
});

module.exports = router;

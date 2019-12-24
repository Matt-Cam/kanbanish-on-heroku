export const getCards = state => state.cards.cards;
export const getCardsPending = state => state.cards.pending;
export const getCardsError = state => state.error;
export const findRightSiblingCard = (state, cardNum) => {
  const card = getCards(state).find(c => {
    return c.cardNumber > cardNum;
  });
  return card;
};

export const findLeftSiblingCard = (state, cardNum) => {
  //starting card
  let cardIndex = cardNum - 1;
  while (cardIndex >= 0) {
    const card = getCards(state).find(c => {
      //should return first card whose cardNumber is less than input value's
      console.log(c);
      return c.cardNumber === cardIndex;
    });
    // if we found a card, this is the card immediately to left, return it
    if (card) return card;
    // otherwise decrement cardIndex and search again
    cardIndex--;
  }
  return null;
};

export const findMaxCardNumber = state => {
  const cards = getCards(state);
  //if cards array is empty return -1, because the receiving function will increment this
  if (cards.length === 0) return -1;
  const max = cards.reduce(function(prev, current) {
    return prev.cardNumber > current.cardNumber ? prev : current;
  });
  return max.cardNumber;
};

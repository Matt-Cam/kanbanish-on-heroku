// api-calls.js
function fetchCardsFromServer() {
  console.log('fetch call made on server');
  // this type of stringing of then's can also be accomplished via await:
  // const response = await fetch('/api/cards');
  // const myJson = await response.json();
  const response = fetch('/api/cards/')
    .then(res => res.json())
    .catch(er => {
      throw er;
    });
  return response;
}

// cardId: the mongo id for that card
// itemNum: index of the item you want to delete
function removeCardItemFromServer(cardId, itemNum) {
  const response = fetch(`/api/cards/removeListItem/${cardId}/${itemNum}`, {
    method: 'POST'
  })
    .then(res => res.json())
    .catch(er => {
      console.log('mc error: ' + er);
    });
  return response;
}

// ADD a list item to one of the cards
async function addCardListItemToServer(cardId, desc) {
  const response = await fetch(`/api/cards/addListItem/${cardId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      listItemDesc: desc
    })
  });
  const data = response.json();
  return data;
}

export {
  fetchCardsFromServer,
  removeCardItemFromServer,
  addCardListItemToServer
};

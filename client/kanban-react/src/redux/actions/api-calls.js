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

// ADD a new card with list
function addCardToServer(title, cardNumber, list) {
  console.log('adding card to API');
  return function(dispatch) {
    fetch('/api/cards/add', {
      method: 'post',
      body: JSON.stringify({ title, cardNumber, list })
    })
      .then(response => response.json())
      .then(jsonRes => {
        console.log('Created card:', jsonRes);
      });
  };
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

/*
// ADD a list item to one of the cards
async function addCardListItemToServer(cardId, desc) {
  try {
    const response = await fetch(`/api/cards/addListItem/${cardId}`, {
      method: 'post',
      body: JSON.stringify({ listItemDesc: desc })
    });
    console.log('response: ');
    console.log(response);
    let data = response.json();
    console.log('data: ');
    console.log(data);
    return data;
  } catch (er) {
    console.log('mc error', er);
  }
}*/
export {
  fetchCardsFromServer,
  removeCardItemFromServer,
  addCardListItemToServer
};

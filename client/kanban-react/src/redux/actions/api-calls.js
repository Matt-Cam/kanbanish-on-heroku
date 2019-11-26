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

function addCardListItemToServer(title, cardNumber, list) {
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

export { fetchCardsFromServer };

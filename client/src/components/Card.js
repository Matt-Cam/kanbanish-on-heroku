import React, { useState, useEffect } from 'react';

import Modal from './Modal';
import AddCardItem from './AddCardItem';
import {
  removeCardListItem,
  moveCardListItem,
  deleteCard,
  moveCardListItemLeftOrRight,
  addCardListItem
} from '../redux/actions/index.js';
import { connect } from 'react-redux';

function Card({
  id,
  _id,
  title,
  list,
  removeItem,
  deleteCard,
  moveItemLeftOrRight,
  moveItem,
  isFirst,
  isLast,
  addListItem
}) {
  // Local state to hold modal visibility
  const [modalVisible, toggleModalVisible] = useState(false);
  const [beingDraggedOver, setBeingDraggedOver] = useState(false);
  const [isOriginatingCard, setIsOriginatingCard] = useState(false);

  const onDragStart = (event, _id, index, listItem) => {
    event.dataTransfer.setData('text', listItem);
    removeItem(_id, index);
  };
  const onDragOver = event => {
    event.preventDefault();
    setBeingDraggedOver(true);
  };
  const onDragLeave = event => {
    setBeingDraggedOver(false);
  };
  const onDrop = (e, _id) => {
    const text = e.dataTransfer.getData('text');
    addListItem(_id, text);
    setBeingDraggedOver(false);
  };

  return (
    <>
      <Modal
        open={modalVisible}
        closeCallback={() => toggleModalVisible(false)}
      >
        <AddCardItem
          cardId={_id}
          closeForm={() => toggleModalVisible(false)}
        ></AddCardItem>
      </Modal>

      <div
        className={
          beingDraggedOver && !isOriginatingCard
            ? 'card beingDraggedOver'
            : 'card'
        }
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={e => onDrop(e, _id)}
      >
        <h4 className='cardHeader'>
          <b>{title}</b>
        </h4>
        <div className='container'>
          <ul>
            {list.map((listItem, index) => {
              return (
                <li
                  className='grabbable'
                  key={index}
                  draggable
                  onDragStart={event =>
                    onDragStart(event, _id, index, listItem)
                  }
                >
                  {!isFirst && (
                    <span
                      className='arrow move-left-arrow'
                      onClick={() =>
                        moveItemLeftOrRight(_id, id, index, listItem, 'left')
                      }
                    >
                      &#10094;
                    </span>
                  )}
                  <button
                    className='mc-btn-delete'
                    onClick={() => removeItem(_id, index)}
                  >
                    X
                  </button>
                  {listItem}
                  {!isLast && (
                    <span
                      className='arrow move-right-arrow'
                      onClick={() =>
                        moveItemLeftOrRight(_id, id, index, listItem, 'right')
                      }
                    >
                      &#10095;
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <button
            className='button mc-btn-secondary mc-btn-red'
            onClick={() => deleteCard(_id)}
          >
            X
          </button>
          <button
            className='button mc-btn-secondary'
            onClick={() => {
              toggleModalVisible(true);
            }}
          >
            Add Item
          </button>
        </div>
        <p style={{ fontSize: '.5em' }}>Card ID: {_id}</p>
      </div>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  moveItemLeftOrRight: (cardId, cardNum, itemId, text, direction) => {
    dispatch(
      moveCardListItemLeftOrRight(cardId, cardNum, itemId, text, direction)
    );
  },
  removeItem: (cardId, itemId) => dispatch(removeCardListItem(cardId, itemId)),
  deleteCard: cardId => dispatch(deleteCard(cardId)),
  addListItem: (id, desc) => dispatch(addCardListItem({ id: id, desc: desc }))
});

export default connect(null, mapDispatchToProps)(Card);

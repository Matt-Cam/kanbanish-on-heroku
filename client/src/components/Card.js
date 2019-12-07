import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import AddCardItem from './AddCardItem';
import {
  removeCardListItem,
  addCardListItem,
  moveCardListItem
} from '../redux/actions/index.js';
import { connect } from 'react-redux';

const Card = ({
  id,
  _id,
  title,
  list,
  removeItem,
  moveItem,
  addItem,
  isFirst,
  isLast
}) => {
  // Local state to hold modal visibility
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Modal
        open={modalVisible}
        closeCallback={() => toggleModalVisible(false)}
      >
        <AddCardItem
          cardId={_id}
          closeForm={() => toggleModalVisible(false)}
        ></AddCardItem>
      </Modal>

      <div className='card'>
        <h4 className='cardHeader'>
          <b>{title}</b>
        </h4>
        <div className='container'>
          <ul>
            {list.map((listItem, index) => {
              return (
                <li key={index}>
                  {!isFirst && (
                    <span
                      className='arrow move-left-arrow'
                      onClick={() => moveItem(_id, id, index, listItem, 'left')}
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
                        moveItem(_id, id, index, listItem, 'right')
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
            className='button mc-btn-secondary'
            onClick={() => {
              toggleModalVisible(true);
            }}
          >
            Add Item
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  moveItem: (cardId, cardNum, itemId, text, direction) => {
    dispatch(moveCardListItem(cardId, cardNum, itemId, text, direction));
  },
  removeItem: (cardId, itemId) => dispatch(removeCardListItem(cardId, itemId))
});

export default connect(null, mapDispatchToProps)(Card);

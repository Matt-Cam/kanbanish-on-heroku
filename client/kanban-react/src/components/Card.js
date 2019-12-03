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

const whiteBackground = {
  backgroundColor: '#f9f8fd'
};

const buttonStyle = {
  borderRadius: '25px',
  background: 'white',
  border: '1px solid red',
  color: 'red',
  margin: '5px'
};

const Card = ({ id, _id, title, list, removeItem, moveItem, addItem }) => {
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

      <div className='card' style={whiteBackground}>
        <h4 className='cardHeader'>
          <b>{title}</b>
        </h4>
        <div className='container'>
          <ul>
            {list.map((listItem, index) => {
              return (
                <li key={index}>
                  <span
                    className='arrow move-left-arrow'
                    onClick={() => moveItem(_id, id, index, listItem, 'left')}
                  >
                    &#10094;
                  </span>
                  <button
                    style={buttonStyle}
                    onClick={() => removeItem(_id, index)}
                  >
                    x
                  </button>
                  {listItem}
                  <span
                    className='arrow move-right-arrow'
                    onClick={() => moveItem(_id, id, index, listItem, 'right')}
                  >
                    &#10095;
                  </span>
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
